const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const Career = require('../models/Career');

// === Configure multer for file uploads ===
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/resumes'); // Folder path to store resumes
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

// Allow only PDF and DOC files
const fileFilter = (req, file, cb) => {
  const allowedTypes = [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  ];
  if (allowedTypes.includes(file.mimetype)) cb(null, true);
  else cb(new Error('Invalid file type. Only PDF/DOC files are allowed.'));
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 2 * 1024 * 1024 } // 2MB limit
});

// === POST /api/career ===
router.post('/', upload.single('resume'), async (req, res) => {
  try {
    const { firstname, lastname, email, phone, position, message } = req.body;
    const resumePath = req.file ? `/uploads/resumes/${req.file.filename}` : null;

    const career = new Career({
      firstname,
      lastname,
      email,
      phone,
      position,
      message,
      resumePath,
    });

    await career.save();
    res.status(201).json({ message: 'Career form submitted successfully!' });
  } catch (error) {
    console.error('Error saving career form:', error);
    res.status(500).json({ error: 'Server error while submitting career form.' });
  }
});

// === GET /api/career === (Fetch all applications)
router.get('/', async (req, res) => {
  try {
    const careers = await Career.find().sort({ createdAt: -1 });
    res.status(200).json(careers);
  } catch (error) {
    console.error('Error fetching career forms:', error);
    res.status(500).json({ error: 'Server error while fetching career forms.' });
  }
});

module.exports = router;
