import { defineNuxtConfig } from 'nuxt'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  // serverMiddleware: [
  //   '~/server-middleware/index.ts'
  // ],
  plugins: ['~/plugins/vue-click-outside.ts'],
  buildModules: [
    // '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    // '@nuxt/postcss8',
    // '@nuxtjs/sitemap'
  ],
  css: ["~/assets/css/tailwind.css"],
  build: {
    postcss: {
      postcssOptions: {
        plugins: {
          tailwindcss: {},
          autoprefixer: {},
        },
      },
    },
  },
  publicRuntimeConfig: {
    app_url: process.env.APP_URL
  },
  // sitemap: {
  //   // options
  // },
})
