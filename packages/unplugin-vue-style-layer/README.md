# unplugin-vue-style-layer
[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![License][license-src]][license-href]

This is a unplugin that can be used to add [CSS layer](https://developer.mozilla.org/en-US/docs/Web/CSS/@layer) to style blocks in `.vue` files.

If you are searching for `Nuxt` usages, please use [nuxt-css-layer](https://github.com/shunnNet/vue-style-layer/tree/main/packages/nuxt-css-layer#readme)

> Current only support `Vite`.

## Features
- Wrap `.vue` style sections in CSS layer

## Usage
Install it.
```sh
# npm
npm add -D unplugin-css-layer

# yarn
yarn add --dev unplugin-css-layer

# pnpm
pnpm add -D unplugin-css-layer
```

```ts
// vite.config.ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import VueStyleLayer from 'unplugin-vue-style-layer/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(), 
    // ! Must place after vue()
    VueStyleLayer(
      // options
    )],
})

```

The style in `.vue` file

```vue
<style>
.title {
  font-size: 18px;
}
</style>
```

will be transformed to

```vue
<style>
@layer components {
  .title {
    font-size: 18px;
  }
}
</style>
```

## Options

### componentLayer
You can change layer name in options.

```ts
// vite.config.ts
export default defineConfig({
  plugins: [
    vue(), 
    VueStyleLayer(
      componentLayer: 'component-layer',
    )],
})
```

### order
> NOTE: `order` only support vite

Prepend css `@layer` declaration in HTML head. This is useful for defining global css layer order;

```ts
export default defineConfig({
  plugins: [
    vue(), 
    VueStyleLayer(
      componentLayer: 'component-layer',
      order: ["component-layer", "uno"],
    )],
})
```

Will prepend the following `<style>` content:

```html
<style>@layer component-layer,uno;</style>
```


### injectOrder
Inject layer declaration in style. This may be used to provide context infomation for some css tool like [postcss-cascade-layer](https://www.npmjs.com/package/@csstools/postcss-cascade-layers)

```ts
export default defineConfig({
  plugins: [
    vue(), 
    VueStyleLayer(
      componentLayer: 'component-layer',
      order: ["component-layer", "uno"],
      injectOrder: true
    )],
})
```

Will result in:

```vue
<style>
@layer component-layer, uno;
@layer component-layer {
  .title {
    font-size: 18px;
  }
}
</style>
```

## component level layer
You can also define layer name in component level, this will take precedence over settings at the options level.

```vue
<!-- Define layer like this -->
<style layer="layer-a">
.title {
  font-size: 18px;
}
</style>

<!-- Result in -->
<style>
@layer-a {
  .title {
    font-size: 18px;
  }
}
</style>
```

If you don't want inject layer to the specific component, set layer to false.

```vue
<!-- This style section will not wrap in CSS layer -->
<style layer="false">
.title {
  font-size: 18px;
}
</style>
```

## License

[MIT](LICENSE).

<!-- Badges -->
[npm-version-src]: https://img.shields.io/npm/v/unplugin-vue-style-layer/latest.svg?style=flat&colorA=18181B&colorB=28CF8D
[npm-version-href]: https://npmjs.com/package/unplugin-vue-style-layer

[npm-downloads-src]: https://img.shields.io/npm/dm/unplugin-vue-style-layer.svg?style=flat&colorA=18181B&colorB=28CF8D
[npm-downloads-href]: https://npmjs.com/package/unplugin-vue-style-layer

[license-src]: https://img.shields.io/npm/l/unplugin-vue-style-layer.svg?style=flat&colorA=18181B&colorB=28CF8D
[license-href]: https://npmjs.com/package/unplugin-vue-style-layer
