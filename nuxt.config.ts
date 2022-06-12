import { defineNuxtConfig } from 'nuxt'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  // serverMiddleware: [
  //   '~/server-middleware/index.ts'
  // ],
  plugins: ['~/plugins/vue-click-outside.ts'],
  buildModules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    // '@nuxtjs/sitemap'
  ],
  css: ["~/assets/css/main.css"],
  publicRuntimeConfig: {
    APP_URL: process.env.APP_URL,
    KEY_OPEN_WEATHER_MAP: process.env.KEY_OPEN_WEATHER_MAP
  },
  // sitemap: {
  //   // options
  // },
})
