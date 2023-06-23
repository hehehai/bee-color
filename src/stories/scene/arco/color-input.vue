<script lang="ts" setup>
import { Select } from '@arco-design/web-vue'
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
  <div class="my-color-container">
    <Select
      class="my-color-select"
      :model-value="_format"
      size="small"
      :bordered="false"
      :trigger-props="{
        contentClass: 'my-color-select-pop'
      }"
      :options="colorSelectOptions"
      @change="handleFormatChange"
    />
    <div class="my-color-input">
      <component :is="formatInput" :model-value="colorValue" @change="handleColorChange" />
    </div>
    <ColorAlphaInput :model-value="colorValue" @change="handleColorChange" />
  </div>
</template>

<style lang="less">
// a 为自定义样式，arc 为覆盖样式
.my-color-container {
  --input-font-size: 13px;
  --input-line-height: 1.7;
  --input-border-radius: 4px;

  display: flex;

  // 数值计步器
  .my-color-steppers.arco-input-wrapper {
    border-radius: var(--input-border-radius);
    padding-left: 6px;
    padding-right: 6px;

    .arco-input.arco-input-size-mini {
      font-size: var(--input-font-size);
      line-height: var(--input-line-height);
    }

    .arco-input-suffix {
      padding-left: 0;
      min-width: 0;

      .arco-input-number-step {
        width: 14px;
      }
    }
  }
}

// 颜色格式选择器
.my-color-select {
  margin-inline-end: 8px;
  width: auto;

  &.arco-select-view-single {
    padding-left: 0;
    padding-right: 0;

    .arco-select-view-suffix {
      padding-left: 6px;
    }
  }
}

.my-color-select-pop {
  min-width: 60px;

  .arco-select-dropdown .arco-select-option {
    line-height: 30px;
  }
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
  }

  .my-color-steppers {
    flex: 1;
  }

  .my-color-hex-input.arco-input-wrapper {
    border-radius: var(--input-border-radius);

    .arco-input.arco-input-size-small {
      font-size: var(--input-font-size);
      line-height: var(--input-line-height);
      padding-top: 1px;
      padding-bottom: 1px;
    }
  }
}

// 透明度输入
.my-color-alpha-input {
  flex: 0 0 48px;
  margin-inline-start: 4px;
}
</style>
