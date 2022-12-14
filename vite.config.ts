import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import eslintPlugin from 'vite-plugin-eslint'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      reactivityTransform: true
    }),
    eslintPlugin()
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@core': path.resolve(__dirname, './src/core'),
      '@clients': path.resolve(__dirname, './src/core/clients'),
      '@interceptors': path.resolve(__dirname, './src/core/interceptors'),
      '@models': path.resolve(__dirname, './src/core/models'),
      '@repositories': path.resolve(__dirname, './src/core/repositories'),
      '@layouts': path.resolve(__dirname, './src/layouts'),
      '@composables': path.resolve(__dirname, './src/composables'),
      '@store': path.resolve(__dirname, './src/store'),
      '@utils': path.resolve(__dirname, './src/utils')
    }
  }
})
