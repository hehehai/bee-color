<script lang="ts" setup>
import { ref } from 'vue'
import type { PresetsItem } from './interface'
import { ColorBlock, ColorPicker } from '@/components'
import { generateColor } from '@/utils/color'
import ColorInput from './color-input.vue'
import ColorPresets from './color-presets.vue'

// see https://ant.design/components/color-picker-cn
// arco primary color #3876F6
const color = ref(generateColor('#3876F6'))

const presets: PresetsItem[] = [
  {
    label: 'Recommended',
    colors: [
      '#000000',
      '#000000E0',
      '#000000A6',
      '#00000073',
      '#00000040',
      '#00000026',
      '#0000001A',
      '#00000012',
      '#0000000A',
      '#00000005',
      '#F5222D',
      '#FA8C16',
      '#FADB14',
      '#8BBB11',
      '#52C41A',
      '#13A8A8',
      '#1677FF',
      '#2F54EB',
      '#722ED1',
      '#EB2F96',
      '#F5222D4D',
      '#FA8C164D',
      '#FADB144D',
      '#8BBB114D',
      '#52C41A4D',
      '#13A8A84D',
      '#1677FF4D',
      '#2F54EB4D',
      '#722ED14D',
      '#EB2F964D'
    ]
  },
  {
    label: 'Recent',
    colors: []
  }
]

</script>

<template>
  <Story title="自定义" icon="heroicons:sparkles-solid">
    <Variant title="Slider">
      <div class="box">
        <div class="my-color-block-trigger">
          <ColorBlock :color="color.toRgbString()" />
        </div>
        <ColorPicker v-model="color" class="my-color-picker">
          <ColorInput v-model="color" />
          <template v-if="presets">
            <div class="my-color-divider"></div>
            <ColorPresets v-model="color" :presets="presets" />
          </template>
        </ColorPicker>
      </div>
    </Variant>
  </story>
</template>

<style lang="less">
// demo 样式，请忽略
.box {
  padding: 40px;
  display: flex;
  justify-content: center;
}

// 以下为自定义样式
.my-color-block-trigger {
  --bee-color-block-width: 24px;
  --bee-color-block-height: 24px;

  cursor: pointer;
  width: 30px;
  height: 30px;
  border-radius: 6px;
  border: 1px solid #d9d9d9;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
  background: #ffffff;

  margin-right: 2em;

  &:hover {
    // ant design primary color
    border-color: #3876F6;
  }
}

.my-color-picker {
  --bee-color-panel-width: 280px;

  box-sizing: border-box;
}

.my-color-divider {
  height: 1px;
  background: #e7e7e7;
  margin: 12px 0;
}
</style>
