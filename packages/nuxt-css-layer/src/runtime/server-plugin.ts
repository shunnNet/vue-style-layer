import type { NitroApp } from "nitropack"

type NitroPlugin = (nitroApp: NitroApp) => void
const defineNitroPlugin = (def: NitroPlugin): NitroPlugin => def

export default defineNitroPlugin((nitroApp) => {
  const order = useRuntimeConfig().cssLayer.order
  if (Array.isArray(order) && order.length) {
    const styleToTop = order.join(",")

    nitroApp.hooks.hook("render:html", (html) => {
      html.head.unshift(`<style>@layer ${styleToTop};</style>`)
    })
  }
})
