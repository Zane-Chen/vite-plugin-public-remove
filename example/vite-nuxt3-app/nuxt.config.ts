// https://nuxt.com/docs/api/configuration/nuxt-config
import template from 'vite-plugin-template';
export default defineNuxtConfig({
  modules: [
    // ...
    '@pinia/nuxt',
    '@vueuse/nuxt'
  ],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@import "@/assets/styles/default.scss";'	
        }
      }
    },
    plugins: [
      template({
        exclude: new RegExp('\/images\/(?!wzfs)[^/]+')
      })
    ]
  }
})
