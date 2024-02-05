import { createUnplugin } from "unplugin"
import type { UnpluginFactory } from "unplugin"
import defu from "defu"
import MagicString from "magic-string"

export type VueStyleLayerOptions = {
  componentLayer: string
  layerOrder: string[]
}

const unpluginFactory: UnpluginFactory<
  Partial<VueStyleLayerOptions> | undefined
> = (options) => {
  const _options = defu(options, {
    componentLayer: "components",
    layerOrder: [],
  })
  const contextLayerInjection =
    Array.isArray(_options.layerOrder) && _options.layerOrder.length > 0
      ? `@layer ${_options.layerOrder.join(", ")};`
      : ""

  return {
    name: "vue-style-layer",
    enforce: "pre",
    transform(code, id) {
      if (!/vue&type=style/.test(id)) {
        return
      }
      const search = (id.match(/(vue&type=style.+)/) as any[])[0]
      const query = new URLSearchParams(search)
      const componentLevelLayer: null | string = query.get("layer")
      let layer = _options.componentLayer

      if (typeof componentLevelLayer === "string") {
        switch (componentLevelLayer) {
          case "false":
            layer = ""
            break
          case "true":
            layer = _options.componentLayer
            break
          default:
            layer = componentLevelLayer
        }
      }

      const s = new MagicString(code)
      if (contextLayerInjection) {
        s.prepend(`${contextLayerInjection}\n`)
      }
      if (layer) {
        s.prepend(`@layer ${layer} {\n`)
        s.append("\n}")
      }

      return s.hasChanged()
        ? {
            code: s.toString(),
            map: s.generateMap(),
          }
        : code
    },
  }
}

export default createUnplugin(unpluginFactory)
