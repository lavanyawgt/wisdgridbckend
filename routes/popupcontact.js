const express = require('express');
const router = express.Router();
const PopupContact = require('../models/PopupContact');
const sendContactEmail = require('../utils/mailer');

router.post('/', async (req, res) => {
  const formData = req.body; // no need to destructure captchaToken

  try {
    // Save form data to MongoDB
    const newContact = new PopupContact(formData);
    await newContact.save();

    // Send email
    await sendContactEmail(formData, 'New Popup Contact');

    return res.status(200).json({ success: true, message: 'Message sent' });
  } catch (err) {
    console.error("❌ Error:", err);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
});

// GET - fetch all popup contact messages
router.get('/', async (req, res) => {
  try {
    const popupContacts = await PopupContact.find().sort({ createdAt: -1 });
    res.status(200).json(popupContacts);
  } catch (error) {
    console.error('Error fetching popup contacts:', error);
    res.status(500).json({ error: 'Server error while fetching popup contacts' });
  }
});


module.exports = router;
