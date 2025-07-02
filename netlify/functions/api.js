export async function handler(event, context) {
  
  const { GIST_ID, GIST_FILENAME } = process.env;
  const GIST_URL = `https://api.github.com/gists/${GIST_ID}`;
  const responseHeaders = { 'Content-Type': 'application/json' };

  if (event.httpMethod === 'GET') {
    try {
      // --- НАЧАЛО БЛОКА ОТЛАДКИ ---
      console.log("--- INCOMING GET REQUEST ---");
      console.log("Attempting to fetch Gist with ID:", GIST_ID);
      console.log("Expecting filename:", GIST_FILENAME);
      // --- КОНЕЦ БЛОКА ОТЛАДКИ ---

      const response = await fetch(GIST_URL);
      if (!response.ok) throw new Error(`GitHub Gist read error: ${response.status}`);
      
      const gistData = await response.json();
      
      // --- ВТОРОЙ БЛОК ОТЛАДKI ---
      // Распечатаем ВЕСЬ ответ от GitHub, чтобы увидеть, что там внутри
      console.log("--- FULL GITHUB RESPONSE ---");
      console.log(JSON.stringify(gistData, null, 2));
      // --- КОНЕЦ БЛОКА ОТЛАДKI ---

      // Проверяем, существует ли поле files
      if (!gistData.files) {
        throw new Error("GitHub response does not contain a 'files' object.");
      }
      
      // Проверяем, существует ли наш конкретный файл
      const file = gistData.files[GIST_FILENAME];
      if (!file) {
        // Если файла нет, выводим список всех файлов, которые есть
        const availableFiles = Object.keys(gistData.files);
        throw new Error(`File '${GIST_FILENAME}' not found in Gist. Available files are: ${availableFiles.join(', ')}`);
      }
      
      const content = file.content;
      
      return {
        statusCode: 200,
        headers: responseHeaders,
        body: content
      };
    } catch (error) {
      // Логируем ошибку и на сервере
      console.error("--- ERROR IN GET REQUEST ---", error.message);
      return { statusCode: 500, body: JSON.stringify({ error: error.message }) };
    }
  }

  // POST и другие методы пока оставим без изменений
  return { statusCode: 405, body: JSON.stringify({ message: "Method Not Allowed" })};
};