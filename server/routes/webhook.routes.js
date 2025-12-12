import express from 'express';
const router = express.Router();
import Donation from '../models/Donation';
import { verifyWebhookSignature } from '../config/wonderful';

// Wonderful.org webhook endpoint
router.post('/wonderful', express.raw({ type: 'application/json' }), async (req, res) => {
  const signature = req.headers['x-wonderful-signature'];
  const payload = req.body;

  try {
    // Verify webhook signature
    if (!verifyWebhookSignature(payload, signature)) {
      return res.status(400).json({ error: 'Invalid signature' });
    }

    const event = JSON.parse(payload.toString());

    // Handle different event types
    switch (event.type) {
      case 'donation.completed':
        await handleDonationCompleted(event.data);
        break;
      
      case 'donation.failed':
        await handleDonationFailed(event.data);
        break;
      
      case 'donation.cancelled':
        await handleDonationCancelled(event.data);
        break;

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    res.json({ received: true });
  } catch (error) {
    console.error('Webhook error:', error);
    res.status(400).json({ error: error.message });
  }
});

// Handle completed donation
async function handleDonationCompleted(data) {
  const donation = await Donation.findOneAndUpdate(
    { sessionId: data.session_id },
    {
      status: 'completed',
      wonderfulDonationId: data.donation_id,
      completedAt: new Date(),
    },
    { new: true }
  );

  if (donation) {
    console.log(`Donation ${donation._id} completed successfully`);
    // TODO: Send thank you email
  }
}

// Handle failed donation
async function handleDonationFailed(data) {
  await Donation.findOneAndUpdate(
    { sessionId: data.session_id },
    { status: 'failed' }
  );
  console.log(`Donation failed: ${data.session_id}`);
}

// Handle cancelled donation
async function handleDonationCancelled(data) {
  await Donation.findOneAndUpdate(
    { sessionId: data.session_id },
    { status: 'cancelled' }
  );
  console.log(`Donation cancelled: ${data.session_id}`);
}

export default router;