const express = require('express');
const Parser = require('rss-parser');
const router = express.Router();
const parser = new Parser();

const FEEDS = [
  'https://techcrunch.com/feed/',
  'https://www.theverge.com/rss/index.xml',
  'https://www.wired.com/feed/category/gear/latest/rss',
  'https://www.electronicsweekly.com/blogs/feed',
];

router.get('/', async (req, res) => {
  try {
    const allFeeds = [];

    for (const feedUrl of FEEDS) {
      const feed = await parser.parseURL(feedUrl);
      
      const formattedItems = feed.items.slice(0, 6).map(item => {
        let image = item.enclosure?.url;

        // Try extracting from HTML content
        if (!image && item['content:encoded']) {
          const match = item['content:encoded'].match(/<img.*?src="(.*?)"/i);
          image = match ? match[1] : null;
        }

        return {
          title: item.title,
          link: item.link,
          date: item.pubDate,
          source: feed.title,
          description: item.contentSnippet || item.content || "",
          image: image || "https://via.placeholder.com/500x300?text=Tech+News"
        };
      });

      allFeeds.push(...formattedItems);
    }

    res.json(allFeeds);
  } catch (err) {
    console.error("RSS fetch error:", err.message);
    res.status(500).json({ error: "Failed to fetch RSS feeds" });
  }
});

module.exports = router;
