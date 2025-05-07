import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
  message: String,
  response: String,
  timestamp: Date
});

const chatSchema = new mongoose.Schema({
  chat_id: String,
  messages: [messageSchema],
  last_updated: Date
});

const conversationSchema = new mongoose.Schema({
  user_id: String,
  chats: [chatSchema]
});

const Conversation = mongoose.model('Conversation', conversationSchema);

module.exports = Conversation;