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
    // TODO add
    // '@nuxtjs/sentry',
    'nuxt-schema-org',
    // 'nuxt-security',
    '@cssninja/nuxt-toaster',
  ],
  stripe: {
    // Server
    apiKey: process.env.STRIPE_SECRET_KEY, // required
    apiVersion: '2022-11-15', // optional, default is '2022-11-15'
    // Client
    publishableKey: process.env.STRIPE_PUBLIC_KEY, // required
  },
  // TODO add
  // sentry: {
  //   dsn: this.config.sentryDsn, // Enter your project's DSN.
  //   // Additional module options go here.
  // },
  // TODO add
  schemaOrg: {
    // canonicalHost: 'https://gpt-chat-news-generator.netlify.app'
    meta: {
      host: 'https://gpt-chat-news-generator.netlify.app',
    },
  },
  // css: ['@/assets/css/fonts.css'],
  css: [
    // '@/css/main.scss',
    '@/assets/css/fonts.css',
    // '@fancyapps/ui/dist/fancybox.css',
  ],
  toaster: {
    // disable the default plugin
    installPlugin: false,
  },
  // router: {
  //   options: {
  //     linkActiveClass: 'active',
  //     linkExactActiveClass: 'exact-active',
  //   },
  // },
  runtimeConfig: {
    // ENV: process.env.ENV,
    public: {
      baseURL: process.env.API_BASE_URL,
      googleClientId: process.env.GOGGLE_CLIENT_ID_KEY,
      clearTimeout: process.env.SETTINGS_CLEAR_ERRORS_TIMEOUT,
      dateTimeTerms: process.env.DATETIME_TERMS,
      dateTimePolicy: process.env.DATETIME_POLICY,
      gtagId: process.env.GTAG_ID,
      sentryDsn: process.env.SENTRY_PUBLIC_DSN,
    },
    // TODO add
    // sentry: {
    //   config: {
    //     // environment: process.env.SENTRY_ENVIRONMENT,
    //     dsn: process.env.SENTRY_PUBLIC_DSN,
    //   },
    //   serverConfig: {
    //     // Any server-specific config
    //   },
    //   clientConfig: {
    //     // Any client-specific config
    //   },
    // },
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
  // Fixing error for unavaliable images with _ipx path at netlify
  // image: {
  //   provider: 'netlify',
  //   netlify: {
  //     baseURl: process.env.IMAGES_URL,
  //   },
  // },
})
