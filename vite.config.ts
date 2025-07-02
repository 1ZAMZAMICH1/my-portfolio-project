import { defineConfig } from 'vite'
    import react from '@vitejs/plugin-react'

    // https://vitejs.dev/config/
    export default defineConfig({
      plugins: [react()],
      server: {
        // Разрешаем все хосты, включая CodeSandbox домены
        host: '0.0.0.0',
        hmr: {
          // Разрешаем HMR для всех хостов
          clientPort: 443
        },
        // Разрешаем все хосты без ограничений
        strictPort: true,
        // Явно разрешаем CodeSandbox домены
        allowedHosts: [
          'localhost',
          '.csb.app',
          '.codesandbox.io',
          'all', // Разрешаем все хосты
        ]
      }
    })
