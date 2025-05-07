const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { Clerk } = require('@clerk/clerk-sdk-node');

// Ensure Clerk API key and signature verification
Clerk.configure({ apiKey: process.env.CLERK_API_KEY });

exports.handleClerkWebhook = async (req, res) => {
  const { type, data } = req.body;

  // Step 1: Verify the Clerk webhook signature
  const signature = req.headers['clerk-signature'];
  const isValid = Clerk.verifyWebhook(req.body, signature);

  if (!isValid) {
    return res.status(400).send('Invalid webhook signature');
  }

  try {
    switch (type) {
      case 'user.created':
        // Create new user in the database
        await prisma.users.create({
          data: {
            clerk_id: data.id,
            email: data.email_addresses[0]?.email_address || '',
            full_name: (data.first_name && data.last_name)
              ? data.first_name + ' ' + data.last_name
              : 'Unknown User',
            profile_picture: data.profile_image_url || null, // Default to null if no profile image
          },
        });
        break;

      case 'user.updated':
        // Update existing user in the database
        await prisma.users.update({
          where: { clerk_id: data.id },
          data: {
            email: data.email_addresses[0]?.email_address || '',
            full_name: (data.first_name && data.last_name)
              ? data.first_name + ' ' + data.last_name
              : 'Unknown User',
            profile_picture: data.profile_image_url || null,
          },
        });
        break;

      case 'user.deleted':
        // Delete user from the database
        await prisma.users.delete({
          where: { clerk_id: data.id },
        });
        break;

      default:
        console.log(`Unhandled webhook type: ${type}`);
    }

    res.status(200).send('Webhook handled');
  } catch (error) {
    console.error('Error handling Clerk webhook:', error);
    res.status(500).send('Something went wrong');
  }
};
