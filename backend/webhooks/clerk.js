import express from'express';
const router = express.Router();
import clerkController from '../controllers/clerkController';

// Set up the Clerk webhook route
router.post('/clerk', clerkController.handleWebhook);

module.exports = router;