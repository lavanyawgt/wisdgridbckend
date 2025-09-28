const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// Helper to extract matching sentence
function extractMatch(text, keyword) {
  const sentences = text.split(/[.?!]/);
  return (
    sentences.find((s) => s.toLowerCase().includes(keyword.toLowerCase()))?.trim() || null
  );
}

// GET /api/search?query=...
router.get('/', async (req, res) => {
  const { query } = req.query;

  if (!query) return res.json([]);

  try {
    const results = await Product.find({
      $or: [
        { name: { $regex: query, $options: 'i' } },
        { category: { $regex: query, $options: 'i' } },
        { description: { $regex: query, $options: 'i' } },
        { shortDescription: { $regex: query, $options: 'i' } }  // ✅ include in search
      ]
    });

    const keyword = query.toLowerCase();

    const filtered = results.map((product) => {
      const name = product.name || '';
      const category = product.category || '';
      const description = product.description || '';
      const slug = product.slug;

      if (!slug) return null;

      const fullText = `${name}. ${category}. ${description}`;
      const sentence = extractMatch(fullText, keyword);

      return {
        _id: product._id,
        name,
        slug: `/products/${slug}`,
        shortDescription: product.shortDescription || "",
        sentence: sentence || ""   // ✅ always include sentence, even if empty
      };
    }).filter(Boolean);

    res.json(filtered);
  } catch (error) {
    console.error('❌ Search error:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
