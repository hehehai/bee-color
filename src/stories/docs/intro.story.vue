<template>
  <Story
    group="top"
    docs-only
    icon="heroicons:home-solid"
  />
</template>

<docs lang="md">
# bee-color

一个 vue3 颜色选择器组件

<div align="center">
  <a href="https://github.com/hehehai/bee-color">
    <img src="https://user-images.githubusercontent.com/12692552/245743508-497e44be-b0d3-4a0d-91e9-b6235d88573a.png" width="320" alt="bee-color" />
  </a>
</div>

---

## 安装

- [文档](https://bee-color-doc.vercel.app/story/src-stories-docs-intro-story-vue)
- [源码](https://github.com/hehehai/bee-color)

```bash
pnpm i @dooit/bee-color
```

<a href='https://docs.npmjs.com/cli/v6/commands/npm'>npm</a> · <a href='https://yarnpkg.com'>yarn</a> · <a href='https://pnpm.js.org/en/'>pnpm</a> · <a href='https://bun.sh/'>bun</a>

## 使用

```ts
import { ColorPicker } from '@dooit/bee-color'
import "@dooit/bee-color/dist/style.css"
```

🧑‍🎨 `Color` 实例经过简单封装，继承自 [`@ctrl/tinycolor`](https://github.com/scttcper/tinycolor)

其他使用方式，请查看组件或使用场景。

### UI 库

[Ant Design Vue](https://antdv.com/components/overview-cn)

- [演示](https://bee-color-doc.vercel.app/story/src-stories-scene-antd-antdv-story-vue)
- [源码](https://github.com/hehehai/bee-color/blob/main/src/stories/scene/antd/antdv.story.vue)

[Arco Vue](https://arco.design/)

- [演示](https://bee-color-doc.vercel.app/story/src-stories-scene-arco-arco-story-vue)
- [源码](https://github.com/hehehai/bee-color/blob/main/src/stories/scene/arco/arco.story.vue)

[Element plus](https://element-plus.org/zh-CN/)

- [演示](https://bee-color-doc.vercel.app/story/src-stories-scene-element-element-story-vue)
- [源码](https://github.com/hehehai/bee-color/blob/main/src/stories/scene/element/element.story.vue)

🫨 如何使用 UI 库颜色选择器？

1. 复制对应 UI store 下的所有文件到项目 `components` 下的 `color-picker` 组件文件夹，替换各文件内的来自 `@/utils/color` 的导入，修改为 `@dooit/bee-color`.
2. 使用，按 `[UI].story.vue` 文件的使用方式，导入 `color-picker` 组件，后使用.

## 致敬

该项目 UI 及基础代码、逻辑，来自：

- [react-component/color-picker](https://github.com/react-component/color-picker)
- [Ant Design](https://github.com/ant-design/ant-design)

## License

@dooit/color-picker is released under the MIT license.
</docs>
