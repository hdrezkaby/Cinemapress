'use strict';

const express = require('express');
const router = express.Router();
const axios = require('axios');
const CP_save = require('../lib/CP_save');

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

// POST /admin/api/rewrite
router.post('/', async (req, res) => {
  const { title, description } = req.body;

  if (!title.trim() || !description.trim()) {
    return res.status(400).json({ error: 'Требуется title и description' });
  }

  // if (!openai) {
  //   return res.status(500).json({ error: 'OpenAI не инициализирован (возможно, отсутствует API-ключ)' });
  // }
  try {
    const prompt = `Перепиши описание фильма "${title}" более красиво и привлекательно для сайта. Описание: ${description}`;
    const completion = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: 'Ты профессиональный копирайтер. Сделай уникальный рерайт текста.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.7
      },
      {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        }
      }
    );
    const newDescription = completion.data.choices[0].message.content;
    res.json({ newDescription });

  } catch (err) {
    console.error('[rewrite] Ошибка генерации описания:', err.message);
    res.status(500).json({ error: 'Ошибка при обращении к OpenAI' });
  }
});

// POST /admin/api/save-description/:id
router.post('/:id', async (req, res) => {
  const { id } = req.params;
  const { description } = req.body;

  if (!id || !description) {
    return res.status(400).json({ error: 'Отсутствует id или описание' });
  }

  try {
    await CP_save.movie({ id, description });
    res.json({ success: true });
  } catch (err) {
    console.error('[rewrite] Ошибка сохранения описания:', err.message);
    res.status(500).json({ error: 'Ошибка сохранения в базу' });
  }
});

module.exports = router;
