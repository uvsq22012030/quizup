export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,
  target: 'server',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'QuizUp',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.svg' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['@/assets/main.scss'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: ['~plugins/vue-final-modal.js'],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    'nuxt-windicss',
  ],

  router: {
    middleware: ['auth'],
  },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://www.npmjs.com/package/nuxt-vue-select
    'nuxt-vue-select',
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    // https://firebase.nuxtjs.org/guide/getting-started/
    [
      '@nuxtjs/firebase',
      {
        config: {
          apiKey: 'AIzaSyDJHk1sA1ooexdAZt_0P6dywT5ByuE4EEA',
          authDomain: 'quizup-91757.firebaseapp.com',
          projectId: 'quizup-91757',
          storageBucket: 'quizup-91757.appspot.com',
          messagingSenderId: '737504622882',
          appId: '1:737504622882:web:9c7d18b64d1e06884e4d7b',
          measurementId: 'G-BZXCQ7M42Q',
          databaseURL:
            'https://quizup-91757-default-rtdb.europe-west1.firebasedatabase.app',
        },
        services: {
          auth: {
            persistence: 'local', // default
            initialize: {
              onAuthStateChangedAction: 'onAuthStateChangedAction',
              subscribeManually: false,
            },
            ssr: false, // default
          },
          database: true,
        },
        onFirebaseHosting: true,
      },
    ],
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'en',
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: ['vue-final-modal'],
  },
}
