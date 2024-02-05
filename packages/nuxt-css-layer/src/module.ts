import {
  defineNuxtModule,
  addServerPlugin,
  createResolver,
  addVitePlugin,
  addWebpackPlugin,
} from "@nuxt/kit"
import VueStyleLayerVite from "unplugin-vue-style-layer/vite"
import VueStyleLayerWebpack from "unplugin-vue-style-layer/webpack"
import defu from "defu"

// Module options TypeScript interface definition
export interface ModuleOptions {
  componentLayer: string
  injectOrder: boolean | string[]
  order: string[]
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: "css-layer",
    configKey: "cssLayer",
  },
  // Default configuration options of the Nuxt module
  defaults: {
    componentLayer: "components",
    injectOrder: false,
    order: [],
  },
  setup(options, nuxt) {
    const _options = defu(options, {})
    const resolver = createResolver(import.meta.url)
    const injectOrder: string[] =
      _options.injectOrder === true
        ? _options.order
        : Array.isArray(_options.injectOrder)
          ? _options.injectOrder
          : []
    const pluginOptions = {
      componentLayer: _options.componentLayer,
      order: [],
      injectOrder,
    }
    addServerPlugin(resolver.resolve("./runtime/server-plugin"))
    addVitePlugin(VueStyleLayerVite(pluginOptions))
    addWebpackPlugin(VueStyleLayerWebpack(pluginOptions))

    nuxt.options.runtimeConfig.cssLayer = { order: _options.order }
  },
})
