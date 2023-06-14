import { defineConfig } from 'histoire'
import { HstVue } from '@histoire/plugin-vue'
import { resolve } from 'node:path'

export default defineConfig({
  plugins: [HstVue()],
  tree: {
    groups: [
      {
        id: 'top',
        title: '' // No toggle
      },
      {
        title: '工具',
        include: (file) => /\/utils\//.test(file.path)
      },
      {
        title: 'Hooks',
        include: (file) => /\/hooks\//.test(file.path)
      },
      {
        title: '组件',
        include: (file) => /\/components\//.test(file.path)
      },
      {
        title: '场景',
        include: (file) => /\/scene\//.test(file.path)
      }
    ]
  },
  setupFile: './histoire.setup.ts',
  vite: {
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src')
      }
    }
  }
})
