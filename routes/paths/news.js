'use strict';

const axios = require('axios');
const cheerio = require('cheerio');
const { CP_news } = require('../lib/CP_news');

module.exports = async function (req, res) {
  const query = req.query.q || 'новости кино';
  const limit = Number(req.query.limit || 5);

  try {
    const newsList = await getNewsFromWeb(query, limit);
    const processed = await Promise.all(newsList.map(CP_news));
    res.send(processed);
  } catch (err) {
    console.error('News error:', err);
    res.sendStatus(500);
  }
};

async function getNewsFromWeb(query, limit = 5) {
  const url = `https://news.google.com/rss/search?q=${encodeURIComponent(query)}&hl=ru&gl=RU&ceid=RU:ru`;
  const { data } = await axios.get(url);
  const $ = cheerio.load(data, { xmlMode: true });

  return $('item')
    .slice(0, limit)
    .map((_, el) => ({
      title: $(el).find('title').text(),
      url: $(el).find('link').text(),
      text: $(el).find('description').text()
    }))
    .get();
}
