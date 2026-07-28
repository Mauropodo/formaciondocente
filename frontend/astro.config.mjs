import { defineConfig } from 'astro/config';
import netlify from '@astrojs/netlify';

export default defineConfig({
  output: 'server',
  adapter: netlify(),
  site: 'http://identidadprofesional.cl',
  server: {
    host: true,
    port: 4321,
  },
});
