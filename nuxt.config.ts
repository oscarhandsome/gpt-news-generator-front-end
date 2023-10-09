// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      // script: [
      //   {
      //     // src: 'https://accounts.google.com/gsi/client',
      //   },
      // ],
      // ...
    },
  },
  googleSignIn: {
    clientId: process.env.GOGGLE_CLIENT_ID_KEY,
  },
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    '@nuxt/image',
    'nuxt3-stripe',
    'floating-vue/nuxt',
    'nuxt-vue3-google-signin',
  ],
  stripe: {
    // Server
    apiKey: process.env.STRIPE_SECRET_KEY, // required
    apiVersion: '2022-11-15', // optional, default is '2022-11-15'
    // Client
    publishableKey: process.env.STRIPE_PUBLIC_KEY, // required
  },
  css: ['@/assets/css/fonts.css'],
  // router: {
  //   options: {
  //     linkActiveClass: 'active',
  //     linkExactActiveClass: 'exact-active',
  //   },
  // },
  runtimeConfig: {
    public: {
      baseURL: process.env.API_BASE_URL,
      googleClientId: process.env.GOGGLE_CLIENT_ID_KEY,
      clearTimeout: process.env.SETTINGS_CLEAR_ERRORS_TIMEOUT,
    },
  },
  // image: {
  //   format: ['webp'],
  // },
  // plugins: [{ src: '~/plugins/vue-select-tree.js', ssr: false }],
  experimental: {
    renderJsonPayloads: false,
  },
  // buildModules: [
  //   [
  //     '@nuxtjs/google-analytics',
  //     {
  //       id: 'G-S2TYG1RNRF',
  //     },
  //   ],
  // ],
})
