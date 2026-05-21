// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://amirrojas.dev', // TODO: reemplazar con tu dominio real antes de publicar
  output: 'static',
  integrations: [sitemap()],
});
