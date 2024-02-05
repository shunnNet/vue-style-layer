import { createUnplugin } from "unplugin"
import type { UnpluginFactory } from "unplugin"
import defu from "defu"
import MagicString from "magic-string"

export type VueStyleLayerOptions = {
  componentLayer: string
  injectOrder: boolean | string[]
  order: string[]
}

export const unpluginFactory: UnpluginFactory<
  Partial<VueStyleLayerOptions> | undefined
> = (options) => {
  const _options = defu(options, {
    componentLayer: "components",
    injectOrder: false,
    order: [],
  })
  const { order } = _options
  const globalOrder =
    Array.isArray(order) && order.length > 0 ? `@layer ${order.join(",")};` : ""

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
      if (layer) {
        s.prepend(`@layer ${layer} {\n`)
        s.append("\n}")
      }
      if (_options.injectOrder) {
        const injectOrder =
          Array.isArray(_options.injectOrder) && _options.injectOrder.length > 0
            ? `@layer ${_options.injectOrder.join(",")};`
            : globalOrder

        if (injectOrder) {
          s.prepend(`${injectOrder}\n`)
        }
      }

      return s.hasChanged()
        ? {
            code: s.toString(),
            map: s.generateMap(),
          }
        : code
    },
    vite: {
      transformIndexHtml() {
        if (!globalOrder) {
          return
        }
        return [
          {
            tag: "style",
            children: globalOrder,
            injectTo: "head-prepend",
          },
        ]
      },
    },
  }
}

export default createUnplugin(unpluginFactory)
