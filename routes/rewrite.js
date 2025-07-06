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
  const { title, description, year } = req.body;

  if (title.trim() && description.trim()) {
    try {
      const id = req.query.id || req.body.id || movieId;
      const prompt = `Перепиши описание фильма "${title}" более красиво и привлекательно для сайта. Описание: ${description}`;
      const completion = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-4o-mini',
          messages: [
            {
              role: 'system',
              content: 'Ты профессиональный копирайтер. Сделай уникальный рерайт текста. Не нужно упоминать год и название фильма.'
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
      console.log('GPT ответ:', newDescription);
      // отдельно отловим ошибку сохранения
      try {
        await new Promise((resolve, reject) => {
          CP_save.save({
            id,
            description: newDescription,
            custom: JSON.stringify({ unique: true })
          }, 'rt', (err, result) => {
            if (err) return reject(err);
            return resolve(result);
          });
        });
        console.log('Описание сохранено!');
      } catch (saveErr) {
        console.error('❌ Ошибка сохранения описания:', saveErr);
      }
      res.json({ newDescription });

    } catch (err) {
      console.error('[rewrite] Ошибка генерации описания:', err.message);
      res.status(500).json({ error: 'Ошибка при обращении к OpenAI' });
    }
  } else if (title.trim() && !description.trim()) {
    try {
      const id = req.query.id || req.body.id || movieId;
      const prompt = `Придумай описание для фильма "${title}" Год выхода: ${year}`;
      const completion = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-4o-mini',
          messages: [
            {
              role: 'system',
              content: 'Ты профессиональный копирайтер. Сделай уникальный рерайт текста. Не нужно упоминать год и название фильма.'
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
      console.log('GPT ответ:', newDescription);
      // отдельно отловим ошибку сохранения
      try {
        await new Promise((resolve, reject) => {
          CP_save.save({
            id,
            description: newDescription,
            custom: JSON.stringify({ unique: true })
          }, 'rt', (err, result) => {
            if (err) return reject(err);
            return resolve(result);
          });
        });
        console.log('Описание сохранено!');
      } catch (saveErr) {
        console.error('❌ Ошибка сохранения описания:', saveErr);
      }
      res.json({ newDescription });

    } catch (err) {
      if (err.response.status === 429) {
        console.warn('[rewrite] Превышен лимит запросов OpenAI');
      }
      console.error('[rewrite] Ошибка генерации описания:', err.message);
      res.status(500).json({ error: 'Ошибка при обращении к OpenAI' });
    }
  } else {
    return res.status(400).json({ error: 'Требуется title и description' });
  }
});

// router.post('/save-description/:id', async (req, res) => {
//   const { id } = req.params;
//   const { description } = req.body;
//
//   if (!id || !description) {
//     return res.status(400).json({ error: 'Отсутствует id или описание' });
//   }
//
//   try {
//     await CP_save.save({ id, description, custom: { unique: true } }, 'rt', () => {});
//     res.json({ success: true });
//   } catch (err) {
//     console.error('[rewrite] Ошибка сохранения описания:', err.message);
//     res.status(500).json({ error: 'Ошибка сохранения в базу' });
//   }
// });


module.exports = router;
