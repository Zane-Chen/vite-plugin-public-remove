import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import template from 'vite-plugin-template';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    template({
      exclude: new RegExp('\/images\/(?!wzfs)[^/]+')
    })
  ]
})
