<script lang="ts" setup>
import { Select } from 'ant-design-vue'
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

const handleFormatChange = (val: any) => {
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
  <div class="antd-color-container">
    <Select
      class="antd-color-select"
      :value="_format"
      size="small"
      :options="colorSelectOptions"
      :bordered="false"
      :dropdown-match-select-width="60"
      :get-popup-container="triggerNode => triggerNode.parentNode"
      @change="handleFormatChange"
    />
    <div class="antd-color-input">
      <component :is="formatInput" :model-value="colorValue" @change="handleColorChange" />
    </div>
    <ColorAlphaInput :model-value="colorValue" @change="handleColorChange" />
  </div>
</template>

<style lang="less">
// antd 为自定义样式，ant 为覆盖样式
.antd-color-container {
  --input-font-size: 13px;
  --input-line-height: 1.7;
  --input-border-radius: 4px;

  display: flex;

  // 数值计步器
  .antd-color-steppers.ant-input-number {
    font-size: var(--input-font-size);
    line-height: var(--input-line-height);
    border-radius: var(--input-border-radius);

    .ant-input-number-input {
      padding-inline-start: 4px;
      padding-inline-end: 0;
    }

    .ant-input-number-handler-wrap {
      width: 16px;

      .ant-input-number-handler-up-inner, .ant-input-number-handler-down-inner {
        right: 2px;
      }
    }
  }
}

// 颜色格式选择器
.antd-color-select {
  margin-inline-end: 8px;
  width: auto;

  &.ant-select-single {

    .ant-select-selector {
      padding: 0 !important;
      border: 0;
    }

    .ant-select-arrow {
      inset-inline-end: 0;
    }

    .ant-select-selection-item {
      padding-inline-end: 16px;
      font-size: var(--input-font-size);
      padding-right: 18px !important;
      line-height: 24px !important;
    }

    .ant-select-item-option-content {
      font-size: 12px;
      line-height: 1.4;
    }

    .ant-select-dropdown {
      border-radius: 6px;

      .ant-select-item {
        min-height: auto;
      }
    }
  }
}

// 颜色输入
.antd-color-input {
  gap: 4px;
  align-items: center;
  flex: 1;
  width: 0;

  .antd-color-hsb-input,
  .antd-color-rgb-input {
    display: flex;
    gap: 4px;
    align-items: center;
  }

  .antd-color-steppers {
    flex: 1;
  }

  .antd-color-hex-input.ant-input-affix-wrapper {
    flex: 1;
    padding: 0 8px;
    border-radius: var(--input-border-radius);

    .ant-input {
      font-size: var(--input-font-size);
      line-height: var(--input-line-height);
    }

    .ant-input-prefix {
      color: rgba(0, 0, 0, 0.25)
    }
  }
}

// 透明度输入
.antd-color-alpha-input {
  flex: 0 0 44px;
  margin-inline-start: 4px;
}
</style>
