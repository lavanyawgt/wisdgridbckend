const express = require('express');
const router = express.Router();
const Subscriber = require('../models/Subscriber');

// @route   POST /api/subscribe
// @desc    Save email to subscriber list
router.post('/', async (req, res) => {
  const { email } = req.body;

  // Basic validation
  if (!email || !/\S+@\S+\.\S+/.test(email)) {
    return res.status(400).json({ error: 'Please provide a valid email address.' });
  }

  try {
    // Check for existing subscriber
    const existing = await Subscriber.findOne({ email });
    if (existing) {
      return res.status(409).json({ error: 'This email is already subscribed.' });
    }

    // Save new subscriber
    const subscriber = new Subscriber({ email });
    await subscriber.save();

    res.status(200).json({ message: 'You have successfully subscribed.' });
  } catch (error) {
    console.error('❌ Error saving subscription:', error.message);
    res.status(500).json({ error: 'Server error. Please try again later.' });
  }
});


// ✅ ADD THIS: GET - fetch all subscribers
router.get('/', async (req, res) => {
  try {
    const subscribers = await Subscriber.find().sort({ createdAt: -1 });
    res.status(200).json(subscribers);
  } catch (error) {
    console.error('❌ Error fetching subscribers:', error.message);
    res.status(500).json({ error: 'Server error while fetching subscribers.' });
  }
});


module.exports = router;
