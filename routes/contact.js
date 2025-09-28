const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');


//rout test

// POST /api/contact
router.post('/', async (req, res) => {
  try {
    const contact = new Contact(req.body);  // Fixed typo here: req.body
    await contact.save();
    res.status(201).json({ message: 'Form submitted successfully!' });
  } catch (error) {
    console.error('Error saving contact:', error);
    res.status(500).json({ error: 'Server error while submitting form.' });
  }
});

// ✅ ADD THIS: GET - fetch all contact messages
router.get('/', async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.status(200).json(contacts);
  } catch (error) {
    console.error('Error fetching contacts:', error);
    res.status(500).json({ error: 'Server error while fetching contacts' });
  }
});



module.exports = router;
