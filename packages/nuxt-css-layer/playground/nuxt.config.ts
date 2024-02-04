export default defineNuxtConfig({
  modules: ['../src/module'],
  cssLayer: {
    order: ["base1", "base2"],
    styleLayer: {
      componentLayer: 'base2',
      layerOrder: ['base1', 'base2']
    }
  },
  devtools: { enabled: true }
})
