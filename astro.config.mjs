import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://dearquitectura.info',
  trailingSlash: 'always',
  build: {
    format: 'directory',
  },
});
