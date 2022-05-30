import { defineNuxtConfig } from 'nuxt'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  serverMiddleware: [
    '~/server-middleware/index.ts'
  ],
  plugins: ['~/plugins/vue-click-outside.ts'],
  buildModules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    // '@nuxtjs/sitemap'
  ],
  publicRuntimeConfig: {
    app_url: process.env.APP_URL
  },
  sitemap: {
    // options
  },
})
