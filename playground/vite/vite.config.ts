import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import VueStyleLayer from 'unplugin-vue-style-layer'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(), 
    VueStyleLayer.vite({
      componentLayer: 'components2',
    })],
})
