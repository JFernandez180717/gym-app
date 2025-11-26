// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      apiBase: 'http://localhost:3001' // tu Nest
    }
  },
  app: {
    head: {
      meta: [{ name: 'referrer', content: 'no-referrer' }],
    },
  },
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxt/ui', '@nuxtjs/color-mode'],
  css: ['~/assets/css/main.css'],
  colorMode: {
    preference: 'system', // usa preferencia del navegador
    fallback: 'light',    // si no se puede detectar
    classSuffix: ''       // evita clases como .dark-mode
  },
  icon: {
    customCollections: [{
      prefix: 'custom',
      dir: './app/assets/icons'
    }]
  }
})
