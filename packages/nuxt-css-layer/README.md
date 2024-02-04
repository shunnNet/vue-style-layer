# nuxt-css-layer
[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![License][license-src]][license-href]
[![Nuxt][nuxt-src]][nuxt-href]

This is a Nuxt module that can be used to control [CSS layers](https://developer.mozilla.org/en-US/docs/Web/CSS/@layer).

## features
- Declare CSS `@layer` at top of HTML head
- Wrap `.vue` style sections in CSS layer (Using [unplugin-vue-style-layer](https://github.com/shunnNet/vue-style-layer/tree/main/packages/unplugin-vue-style-layer#readme))

## Usage
Install it.
```sh
# npm
npm add -D nuxt-css-layer

# yarn
yarn add --dev nuxt-css-layer

# pnpm
pnpm add -D nuxt-css-layer
```

Then, setup module in `nuxt.config`

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  modules: [
    "nuxt-css-layer",
  ],
  cssLayer: {
    order: ["components", "uno"]
  }
})
```

Will insert the style tag in html head:

```html
<style>
@layer components, uno;
</style>
```

You can also customize component layer. For more `styleLayer` option usages, check [unplugin-vue-style-layer](https://github.com/shunnNet/vue-style-layer/tree/main/packages/unplugin-vue-style-layer#readme)

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  modules: [
    "nuxt-css-layer",
  ],
  cssLayer: {
    order: ["components", "uno"],
    styleLayer: { // use styleLayer to pass options to unplugin-vue-style-layer
      componentLayer: "components" // default
    }
  }
})
```

## License

[MIT](LICENSE).


<!-- Badges -->
[npm-version-src]: https://img.shields.io/npm/v/nuxt-css-layer/latest.svg?style=flat&colorA=18181B&colorB=28CF8D
[npm-version-href]: https://npmjs.com/package/nuxt-css-layer

[npm-downloads-src]: https://img.shields.io/npm/dm/nuxt-css-layer.svg?style=flat&colorA=18181B&colorB=28CF8D
[npm-downloads-href]: https://npmjs.com/package/nuxt-css-layer

[license-src]: https://img.shields.io/npm/l/nuxt-css-layer.svg?style=flat&colorA=18181B&colorB=28CF8D
[license-href]: https://npmjs.com/package/nuxt-css-layer

[nuxt-src]: https://img.shields.io/badge/Nuxt-18181B?logo=nuxt.js
[nuxt-href]: https://nuxt.com