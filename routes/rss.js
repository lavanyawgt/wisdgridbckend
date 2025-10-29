const express = require('express');
const Parser = require('rss-parser');
const router = express.Router();

const parser = new Parser();

// ✅ GET /api/rss — Fetch latest tech news
router.get('/', async (req, res) => {
  try {
    const feedUrls = [
      'https://techcrunch.com/feed/',
      'https://spectrum.ieee.org/rss/fulltext',
      'https://www.technologyreview.com/feed/',
      'https://www.theverge.com/rss/index.xml',
      'https://www.aitrends.com/feed/',
      'https://www.electronicsweekly.com/feed/'
    ];

    // Fetch and parse all feeds
    const feeds = await Promise.all(feedUrls.map(url => parser.parseURL(url)));

    // Combine and sort by date
    const articles = feeds.flatMap(feed =>
      feed.items.map(item => ({
        title: item.title,
        link: item.link,
        date: item.pubDate,
        source: feed.title,
        description: item.contentSnippet || '',
      }))
    ).sort((a, b) => new Date(b.date) - new Date(a.date));

    res.json(articles.slice(0, 15)); // Send top 15 latest
  } catch (err) {
    console.error('❌ RSS Fetch Error:', err);
    res.status(500).json({ error: 'Failed to fetch RSS feeds' });
  }
});

module.exports = router;
