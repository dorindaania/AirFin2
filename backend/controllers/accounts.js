import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// GET all accounts for a user (both Bank and MoMo)
exports.getAllAccountsForUser = async (req, res) => {
  const { userId } = req.params;
  try {
    const accounts = await prisma.accounts.findMany({
      where: { user_id: userId }
    });
    const bankAccounts = accounts.filter(account => account.account_type === 'bank');
    const momoAccounts = accounts.filter(account => account.account_type === 'momo');
    res.json({ bankAccounts, momoAccounts });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET one account by accountId
exports.getAccountById = async (req, res) => {
  const { accountId } = req.params;
  try {
    const account = await prisma.accounts.findUnique({ where: { id: accountId } });
    if (!account) return res.status(404).json({ error: 'Account not found' });
    res.json(account);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// CREATE a new account
exports.createAccount = async (req, res) => {
  const { userId, accountType, accountName, accountNumber, provider, isDefault } = req.body;
  try {
    // If the new account should be default, set all other accounts for the user as non-default
    if (isDefault) {
      await prisma.accounts.updateMany({ where: { user_id: userId }, data: { is_default: false } });
    }
    const newAccount = await prisma.accounts.create({
      data: {
        user_id: userId,
        account_type: accountType, // 'bank' or 'momo'
        account_name: accountName,
        account_number: accountNumber,
        provider: provider,
        is_default: isDefault
      }
    });
    res.status(201).json(newAccount);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE an account
exports.updateAccount = async (req, res) => {
  const { accountId } = req.params;
  const updates = req.body;
  try {
    const updatedAccount = await prisma.accounts.update({
      where: { id: accountId },
      data: updates
    });
    res.json(updatedAccount);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE an account
exports.deleteAccount = async (req, res) => {
  const { accountId } = req.params;
  try {
    await prisma.accounts.delete({ where: { id: accountId } });
    res.json({ message: 'Account deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Set default account (generic for both bank and MoMo)
exports.setDefaultAccount = async (req, res) => {
  const { accountId } = req.params;
  try {
    const account = await prisma.accounts.findUnique({ where: { id: accountId } });
    if (!account) return res.status(404).json({ error: 'Account not found' });

    // Set all accounts of this user to non-default
    await prisma.accounts.updateMany({
      where: { user_id: account.user_id },
      data: { is_default: false }
    });

    // Set this account as default
    const updatedAccount = await prisma.accounts.update({
      where: { id: accountId },
      data: { is_default: true }
    });

    res.json(updatedAccount);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
