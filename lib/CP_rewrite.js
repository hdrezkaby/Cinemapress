const axios = require('axios');
const CP_save = require('./CP_save'); // Обязательно должен быть рабочий
const CP_get = require('./CP_get');

let apiKey;

async function rewriteDescription(movie) {
  try {
    const modules = require('../config/production/modules');
    apiKey = modules.rewrite.data.token || '';
    const prompt = `Сделай уникальный рерайт описания фильма "${movie.title}":\n${movie.description || movie.descr}`;

    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: 'Ты опытный копирайтер. Делаешь качественный рерайт описаний фильмов, избегая повторов и сохраняя смысл.'
          },
          { role: 'user', content: prompt }
        ],
        temperature: 0.7,
        max_tokens: 500
      },
      {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        }
      }
    );

    const rewritten = response.data.choices[0].message.content.trim();

    if (rewritten && rewritten.length > 50) {
      await CP_save.movie(movie.id, { description: rewritten }, () => {
        console.log(`✅ ${movie.title} — рерайт сохранён`);
      });
    } else {
      console.warn(`⚠️ ${movie.title} — рерайт слишком короткий`);
    }
  } catch (err) {
    console.error(`❌ Ошибка с ${movie.title}:`, err.message);
  }
}

async function runBatchRewrite(limit = 10) {
  CP_get.movies({ query: '', filter: {}, year: 0, limit }, async function (err, movies) {
  if (err || !movies || !movies.length) {
    return console.error('❌ Фильмы не найдены');
  }

  for (const movie of movies) {
    if (movie.description && movie.description.length > 50) continue;
    await rewriteDescription(movie);
    await new Promise(r => setTimeout(r, 1500));
  }
});
}

module.exports = { runBatchRewrite };
