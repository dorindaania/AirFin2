// config/db.js

// PostgreSQL with Prisma
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// MongoDB with Mongoose
const mongoose = require('mongoose');

// MongoDB connection function
const connectMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected successfully');
  } catch (err) {
    console.error('MongoDB connection failed:', err);
  }
};

// Prisma Client with global handling for production environment
const globalForPrisma = global;

// Use global prisma if available to avoid reinitializing
const prismaClient = globalForPrisma.prisma || new PrismaClient({
  log: ['query'],
});

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prismaClient;
}

// Export both Prisma and MongoDB connection
module.exports = { prisma: prismaClient, connectMongoDB };
