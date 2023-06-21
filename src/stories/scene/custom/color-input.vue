<script lang="ts" setup>
import { ColorFormat, colorSelectOptions } from './constants'
import type { Color } from '@/utils/color'
import { defaultColor } from '@/utils/color'
import { useColorState } from '@/hooks/useColorState'
import { computed, toRefs } from 'vue'
import ColorAlphaInput from './color-alpha-input.vue'
import ColorHexInput from './color-hex-input.vue'
import ColorRgbInput from './color-rgb-input.vue'
import ColorHsbInput from './color-hsb-input.vue'
import { useModelState } from '@/hooks/useModelState'
import type { ChangeEvent } from './interface'

interface SliderProps {
  modelValue?: Color,
  defaultValue?: Color,
  format?: ColorFormat
}

const props = withDefaults(defineProps<SliderProps>(), {
  modelValue: undefined,
  defaultValue: undefined,
  format: undefined
})

const emit = defineEmits<{
  (e: 'update:modelValue', color?: Color): void,
  (e: 'change', color?: Color): void,
  (e: 'update:format', format: ColorFormat): void
}>()

const { modelValue, defaultValue, format: modelFormat } = toRefs(props)

const [colorValue, setColorValue] = useColorState(defaultColor, {
  defaultValue,
  modelValue
})

const [_format, setFormat] = useModelState(ColorFormat.hex, {
  modelValue: modelFormat
})

const formatInput = computed(() => {
  switch (_format.value) {
    case ColorFormat.hex:
      return ColorHexInput
    case ColorFormat.rgb:
      return ColorRgbInput
    case ColorFormat.hsb:
      return ColorHsbInput
    default:
      return ColorHexInput
  }
})

const handleFormatChange = (e: Event) => {
  const val = (e as ChangeEvent<ColorFormat>).target.value ?? ColorFormat.hex
  setFormat(val)
  emit('update:format', val)
}

const handleColorChange = (color?: Color) => {
  setColorValue(color)
  emit('update:modelValue', color)
  emit('change', color)
}

</script>

<template>
  <div class="my-color-container">
    <select class="my-color-select" :value="_format" @input="handleFormatChange">
      <template v-for="item in colorSelectOptions" :key="item.value">
        <option :value="item.value">
          {{ item.label }}
        </option>
      </template>
    </select>
    <div class="my-color-input">
      <component :is="formatInput" :model-value="colorValue" @change="handleColorChange" />
    </div>
    <ColorAlphaInput :model-value="colorValue" @change="handleColorChange" />
  </div>
</template>

<style lang="less">
.my-color-container {
  --input-font-size: 13px;
  --input-height: 22px;
  --input-border-radius: 4px;

  display: flex;

  // 数值计步器
  .my-color-steppers {
    border-radius: var(--input-border-radius);
    padding-left: 6px;
    padding-right: 6px;
    border: 1px solid #e7e7e7;
    padding: 0 0 0 5px;
    height: var(--input-height);
    line-height: var(--input-height);
  }
}

// 颜色格式选择器
.my-color-select {
  border: none;
  background: transparent;
  cursor: pointer;
  margin-inline-end: 8px;
  width: auto;
}

.my-color-select-pop {
  min-width: 60px;
}

// 颜色输入
.my-color-input {
  gap: 4px;
  align-items: center;
  flex: 1;
  width: 0;

  .my-color-hsb-input,
  .my-color-rgb-input {
    display: flex;
    gap: 4px;
    align-items: center;

    .my-color-steppers {
      width: calc(100% / 3);
    }
  }

  .my-color-steppers {
    flex: 1;
  }

  .my-color-hex-input {
    border: 1px solid #e7e7e7;
    padding: 0px 5px;
    height: var(--input-height);
    line-height: var(--input-height);
    border-radius: var(--input-border-radius);
    width: -webkit-fill-available;
  }
}

// 透明度输入
.my-color-alpha-input {
  flex: 0 0 40px;
  margin-inline-start: 4px;
}
</style>
