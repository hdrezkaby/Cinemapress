'use strict';

const axios = require('axios');
const CP_save = require('./CP_save');

let apiKey;

try {
  const modules = require('../config/production/modules');
  apiKey = modules.rewrite.data.token || '';

  if (!apiKey) {
    console.warn('[rewrite] OpenAI API ключ не задан в modules.rewrite.data.token');
  }
} catch (err) {
  console.error('[rewrite] Ошибка инициализации OpenAI SDK:', err.message);
}

async function CP_news({ title, url, text }) {
  const prompt = `Перепиши новость уникально и лаконично, сохрани суть:\n\n${text}`;

  const response = await axios.post(
    'https://api.openai.com/v1/chat/completions',
    {
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7,
      max_tokens: 512
    },
    {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      }
    }
  );

  const rewritten = response.data.choices[0].message.content.trim();

  // Сохраняем новость
  CP_save.news({
    title,
    source: url,
    text: rewritten,
    date: new Date().toISOString()
  });

  return {
    title,
    url,
    text: rewritten
  };
}

module.exports = { CP_news };
