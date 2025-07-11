export async function handler(event, context) {
  
  const { GIST_ID, GITHUB_TOKEN, GIST_FILENAME } = process.env;
  const GIST_URL = `https://api.github.com/gists/${GIST_ID}`;
  
  const responseHeaders = { 
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization'
  };

  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 204,
      headers: responseHeaders
    };
  }

  // --- GET ЗАПРОС ТЕПЕРЬ УМНЕЕ ---
  if (event.httpMethod === 'GET') {
    try {
      const response = await fetch(GIST_URL);
      if (!response.ok) throw new Error(`Gist read error: ${response.status}`);
      
      const gistData = await response.json();
      const content = gistData.files[GIST_FILENAME].content;
      const db = JSON.parse(content);

      // Проверяем, не запрашивают ли одну работу по ID (например, /api/?id=123)
      const workId = event.queryStringParameters?.id;

      if (workId) {
        // Если ID есть, ищем и отдаем только одну работу
        const work = (db.works || []).find(w => w.id === workId);
        if (work) {
          return { statusCode: 200, headers: responseHeaders, body: JSON.stringify(work) };
        } else {
          return { statusCode: 404, headers: responseHeaders, body: JSON.stringify({ error: "Work not found" }) };
        }
      } else {
        // Если ID нет, отдаем ВСЮ базу, как и раньше
        return { statusCode: 200, headers: responseHeaders, body: content };
      }
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