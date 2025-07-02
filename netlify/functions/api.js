// Мы больше не используем require('node-fetch').
// В современной среде Node.js fetch уже встроен.

// Получаем наши секреты из настроек Netlify
const { GIST_ID, GITHUB_TOKEN, GIST_FILENAME } = process.env;

// URL для обращения к API GitHub
const GIST_URL = `https://api.github.com/gists/${GIST_ID}`;

// Заголовки для аутентификации
const GITHUB_HEADERS = {
  'Accept': 'application/vnd.github+json',
  'Authorization': `token ${GITHUB_TOKEN}`,
  'X-GitHub-Api-Version': '2022-11-28'
};

// Используем современный синтаксис export'а
export async function handler(event, context) {
  
  // Стандартные заголовки для ответа браузеру
  const responseHeaders = { 'Content-Type': 'application/json' };

  // --- ЧТЕНИЕ ДАННЫХ (GET) ---
  if (event.httpMethod === 'GET') {
    try {
      const response = await fetch(GIST_URL);
      if (!response.ok) throw new Error(`GitHub Gist read error: ${response.status}`);
      
      const gistData = await response.json();
      const content = gistData.files[GIST_FILENAME].content;
      
      return {
        statusCode: 200,
        headers: responseHeaders,
        body: content
      };
    } catch (error) {
      return { statusCode: 500, body: JSON.stringify({ error: error.message }) };
    }
  }

  // --- ЗАПИСЬ ДАННЫХ (POST) ---
  if (event.httpMethod === 'POST') {
    try {
      // ----- НАЧАЛО БЛОКА ОТЛАДКИ -----
      console.log("--- INCOMING POST REQUEST ---");
      console.log("GIST_ID from environment:", GIST_ID);
      // ВАЖНО: НИКОГДА НЕ ЛОГИРУЙ ВЕСЬ ТОКЕН! Только его часть для проверки.
      console.log("GITHUB_TOKEN exists:", GITHUB_TOKEN ? `Yes, starts with ${GITHUB_TOKEN.substring(0, 7)}` : "No, it's missing!");
      console.log("GIST_FILENAME from environment:", GIST_FILENAME);
      console.log("Target URL for PATCH:", GIST_URL);
      // ----- КОНЕЦ БЛОКА ОТЛАДКИ -----

      const body = {
        files: {
          [GIST_FILENAME]: {
            content: event.body
          }
        }
      };

      const response = await fetch(GIST_URL, {
        method: 'PATCH',
        headers: GITHUB_HEADERS,
        body: JSON.stringify(body)
      });
      
      if (!response.ok) {
        const errorBody = await response.text();
        // Логируем ошибку, чтобы увидеть ответ от GitHub
        console.error("GitHub API Error Response:", errorBody);
        throw new Error(`GitHub Gist write error: ${response.status} - ${errorBody}`);
      }
      
      return {
        statusCode: 200,
        headers: responseHeaders,
        body: JSON.stringify({ message: 'Database updated successfully!' })
      };
    } catch (error) {
      return { statusCode: 500, body: JSON.stringify({ error: error.message }) };
    }
  }
  
  return { statusCode: 405, body: JSON.stringify({ message: "Method Not Allowed" })};
};