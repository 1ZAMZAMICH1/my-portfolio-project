export async function handler(event, context) {
  const { GIST_ID, GITHUB_TOKEN, GIST_FILENAME } = process.env;
  const GIST_URL = `https://api.github.com/gists/${GIST_ID}`;
  const responseHeaders = { 'Content-Type': 'application/json' };

  // --- ЧТЕНИЕ ДАННЫХ (GET) ---
  if (event.httpMethod === 'GET') {
    try {
      console.log(`GET request for Gist ID: ${GIST_ID}`);
      const response = await fetch(GIST_URL);
      if (!response.ok) throw new Error(`Gist read error: ${response.status}`);
      const gistData = await response.json();
      const file = gistData.files[GIST_FILENAME];
      if (!file) throw new Error(`File '${GIST_FILENAME}' not found.`);
      return { statusCode: 200, headers: responseHeaders, body: file.content };
    } catch (error) {
      console.error("GET Error:", error.message);
      return { statusCode: 500, body: JSON.stringify({ error: error.message }) };
    }
  }

  // --- ЗАПИСЬ ДАННЫХ (POST) ---
  if (event.httpMethod === 'POST') {
    try {
      // --- ОТЛАДКА POST-ЗАПРОСА ---
      console.log("--- INCOMING POST REQUEST ---");
      console.log("GIST_ID:", GIST_ID ? "Exists" : "MISSING!");
      console.log("GITHUB_TOKEN:", GITHUB_TOKEN ? `Exists, starts with ${GITHUB_TOKEN.substring(0, 7)}` : "MISSING!");
      console.log("GIST_FILENAME:", GIST_FILENAME ? "Exists" : "MISSING!");
      console.log("Target URL for PATCH:", GIST_URL);
      // --- КОНЕЦ ОТЛАДКИ ---

      const GITHUB_HEADERS = {
        'Accept': 'application/vnd.github+json',
        'Authorization': `token ${GITHUB_TOKEN}`,
        'X-GitHub-Api-Version': '2022-11-28'
      };

      const body = { files: { [GIST_FILENAME]: { content: event.body } } };

      const response = await fetch(GIST_URL, {
        method: 'PATCH',
        headers: GITHUB_HEADERS,
        body: JSON.stringify(body)
      });
      
      if (!response.ok) {
        const errorBody = await response.text();
        console.error("GitHub API Error Response:", errorBody);
        throw new Error(`Gist write error: ${response.status}`);
      }
      
      return { statusCode: 200, headers: responseHeaders, body: JSON.stringify({ message: 'Database updated!' }) };
    } catch (error) {
      console.error("POST Error:", error.message);
      return { statusCode: 500, body: JSON.stringify({ error: error.message }) };
    }
  }
  
  return { statusCode: 405, body: JSON.stringify({ message: "Method Not Allowed" })};
};