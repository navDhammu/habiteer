/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import viteTsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
   plugins: [react(), viteTsconfigPaths()],
   test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: 'src/setupTests.ts',
   },
   server: {
      proxy: {
         '/api': 'http://localhost:3000',
      },
   },
});
