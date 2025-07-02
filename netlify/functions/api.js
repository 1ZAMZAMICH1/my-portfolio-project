const fetch = require('node-fetch');

const { GIST_ID, GITHUB_TOKEN, GIST_FILENAME } = process.env;
const GIST_URL = `https://api.github.com/gists/${GIST_ID}`;
const GITHUB_HEADERS = {
  'Accept': 'application/vnd.github+json',
  'Authorization': `token ${GITHUB_TOKEN}`,
  'X-GitHub-Api-Version': '2022-11-28'
};

exports.handler = async function(event) {
  const responseHeaders = { 'Content-Type': 'application/json' };

  if (event.httpMethod === 'GET') {
    try {
      const response = await fetch(GIST_URL);
      const gistData = await response.json();
      const content = gistData.files[GIST_FILENAME].content;
      return { statusCode: 200, headers: responseHeaders, body: content };
    } catch (error) {
      return { statusCode: 500, body: JSON.stringify({ error: error.message }) };
    }
  }

  if (event.httpMethod === 'POST') {
    try {
      const body = { files: { [GIST_FILENAME]: { content: event.body } } };
      const response = await fetch(GIST_URL, {
        method: 'PATCH',
        headers: GITHUB_HEADERS,
        body: JSON.stringify(body)
      });
      if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);
      return { statusCode: 200, headers: responseHeaders, body: JSON.stringify({ message: 'Database updated!' }) };
    } catch (error) {
      return { statusCode: 500, body: JSON.stringify({ error: error.message }) };
    }
  }
  
  return { statusCode: 405, body: "Method Not Allowed" };
};