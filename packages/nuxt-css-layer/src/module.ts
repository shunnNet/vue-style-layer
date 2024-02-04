import {
  defineNuxtModule,
  addServerPlugin,
  createResolver,
  addVitePlugin,
} from "@nuxt/kit"
import VueStyleLayer from "unplugin-vue-style-layer"
import defu from "defu"

// Module options TypeScript interface definition
export interface ModuleOptions {}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: "css-layer",
    configKey: "cssLayer",
  },
  // Default configuration options of the Nuxt module
  defaults: {},
  setup(options, nuxt) {
    const _options = defu(options, {
      styleLayer: {},
      order: [],
    })
    const resolver = createResolver(import.meta.url)
    addServerPlugin(resolver.resolve("./runtime/server-plugin"))
    addVitePlugin(VueStyleLayer.vite(_options.styleLayer))

    nuxt.options.runtimeConfig.cssLayer = { order: _options.order }
  },
})
