import { resolve } from "node:path";
import { defineConfig } from "vite";
import vueJsx from "@vitejs/plugin-vue-jsx";
import Vue from "@vitejs/plugin-vue";
import dts from "vite-plugin-dts";

export default defineConfig(() => {
  console.log()
  // 如果我们的 .vue 文件有样式，它将被编译为一个单独的 `.css` 文件，存储在 /dist 目录下。
  const plugins = [
    Vue(),
    vueJsx(),
  ]

  // 判断环境，Histoire 下不打包 dts
  if (!process.env.HISTOIRE_ENV) {
    plugins.push(dts({
      //  当为 true 时会基于 package.json 的 types 字段生成，或者 `${outputDir}/index.d.ts`
      insertTypesEntry: true,
      tsConfigFilePath: resolve(__dirname, "./tsconfig.json")
    }))
  }

  return {
    plugins,
    resolve: {
      alias: {
        "@": resolve(__dirname, "src"),
      },
    },

    build: {
      // 输出编译后的文件到 /dist 目录下。
      outDir: "./dist",
      cssCodeSplit: false,
      lib: {
        // 设置入口文件（包含我们导出组件的文件）。
        entry: resolve(__dirname, "src/index.ts"),
        // 库的名称。
        name: "bee-color",
        // 我们正在为 CJS 和 ESM 构建，使用一个函数来自动重命名文件。
        // 例如：my-component-library.esm.js
        fileName: (format: string) => `${"bee-color"}.${format}.js`,
      },
      rollupOptions: {
        // Vue 是由父项目提供的，不要在我们的库中编译 Vue 源代码。
        external: ["vue"],
        output: { globals: { vue: "Vue" } },
      },
    },
  }
});
