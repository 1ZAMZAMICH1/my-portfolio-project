// ПОЛНЫЙ КОД для netlify/functions/api.js

export async function handler(event, context) {
  
  const { GIST_ID, GITHUB_TOKEN, GIST_FILENAME } = process.env;
  const GIST_URL = `https://api.github.com/gists/${GIST_ID}`;

  // Заголовки, которые мы будем отправлять в ответе
  const responseHeaders = { 
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*', // Разрешаем CORS для всех
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization'
  };

  // Обработка preflight-запроса от браузера для POST
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 204, // No Content
      headers: responseHeaders
    };
  }

  // --- ЧТЕНИЕ ДАННЫХ (GET) ---
  if (event.httpMethod === 'GET') {
    try {
      const response = await fetch(GIST_URL);
      if (!response.ok) throw new Error(`Gist read error: ${response.status}`);
      const gistData = await response.json();
      const file = gistData.files[GIST_FILENAME];
      if (!file) throw new Error(`File '${GIST_FILENAME}' not found.`);
      return { statusCode: 200, headers: responseHeaders, body: file.content };
    } catch (error) {
      return { statusCode: 500, headers: responseHeaders, body: JSON.stringify({ error: error.message }) };
    }
  }

  // --- ЗАПИСЬ ДАННЫХ (POST) ---
  if (event.httpMethod === 'POST') {
    try {
      const GITHUB_HEADERS = {
        'Accept': 'application/vnd.github+json',
        'Authorization': `token ${GITHUB_TOKEN}`,
      };
      const body = { files: { [GIST_FILENAME]: { content: event.body } } };
      const response = await fetch(GIST_URL, {
        method: 'PATCH',
        headers: GITHUB_HEADERS,
        body: JSON.stringify(body)
      });
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Gist write error: ${response.status}. Body: ${errorText}`);
      }
      return { statusCode: 200, headers: responseHeaders, body: JSON.stringify({ message: 'Database updated!' }) };
    } catch (error) {
      return { statusCode: 500, headers: responseHeaders, body: JSON.stringify({ error: error.message }) };
    }
  }
  
  return { statusCode: 405, headers: responseHeaders, body: JSON.stringify({ message: "Method Not Allowed" })};
};