import { describe, it, expect } from "vitest"
import { fileURLToPath } from "node:url"
import { setup, $fetch } from "@nuxt/test-utils/e2e"

describe("ssr", async () => {
  await setup({
    rootDir: fileURLToPath(new URL("./fixtures/basic", import.meta.url)),
  })

  it("should render the style tag with layers", async () => {
    // Get response to a server-rendered page with `$fetch`.
    const html = await $fetch("/")
    expect(html).toContain("<style>@layer layer1,layer2;</style>")
  })
})
