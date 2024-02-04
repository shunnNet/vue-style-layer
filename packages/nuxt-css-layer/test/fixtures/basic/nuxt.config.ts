import MyModule from "../../../src/module"

export default defineNuxtConfig({
  modules: [MyModule],
  cssLayer: {
    order: ["layer1", "layer2"],
  },
})
