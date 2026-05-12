// @ts-check
import { defineConfig, envField } from 'astro/config'

// https://astro.build/config
export default defineConfig({
  site: 'https://nikkaku.github.io',
  env: {
    schema: {
      TITLE: envField.string({ context: 'client', access: 'public', default: '雜響' }),
      DESCRIPTION: envField.string({ context: 'client', access: 'public', default: '寫下那些細碎的小事' }),
      COUNT: envField.number({ context: 'client', access: 'public', default: 6 }),
      GITHUB: envField.string({ context: 'client', access: 'public', default: 'https://github.com/nikkaku' }),
    }
  },
  markdown: {
    shikiConfig: {
      theme: 'dracula',
      themes: {
        light: 'ayu-light',
        dark: 'ayu-dark',
      }
    }
  }
});
