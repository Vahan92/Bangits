import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000
  },
  // resolve: {
  //   alias: {
  //     'date-fns/_lib/format/longFormatters': 'date-fns/esm/_lib/format/longFormatters/index.js'
  //   }
  // }
});
