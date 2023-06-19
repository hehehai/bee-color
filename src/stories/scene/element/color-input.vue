<script lang="ts" setup>
import { ElSelect, ElOption } from 'element-plus'
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
    <ElSelect
      class="my-color-select"
      :model-value="_format"
      size="small"
      :teleported="false"
      popper-class="my-color-select-pop"
      @change="handleFormatChange"
    >
      <ElOption
        v-for="item in colorSelectOptions"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </ElSelect>
    <div class="my-color-input">
      <component :is="formatInput" :model-value="colorValue" @change="handleColorChange" />
    </div>
    <ColorAlphaInput :model-value="colorValue" @change="handleColorChange" />
  </div>
</template>

<style lang="less">
.my-color-container {
  --input-font-size: 13px;
  --input-line-height: 1.7;
  --input-border-radius: 4px;

  display: flex;
}

// 颜色格式选择器
.my-color-select {
  width: 60px;
  margin-inline-end: 6px;

  .el-input--small {
    --el-input-height: 26px;
    font-size: 12px;
  }
}

.my-color-select-pop {
  min-width: 60px;

  .el-select-dropdown__item {
    padding: 0 16px;
    height: 26px;
    line-height: 26px;
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

    &.el-input-number.is-controls-right .el-input__wrapper {
      padding-left: 6px;
      padding-right: 23px;
    }

    &.el-input-number--small .el-input-number__decrease,
    &.el-input-number--small .el-input-number__increase {
      width: 16px;
    }

    .el-input--small .el-input__inner {
      --el-input-inner-height: 24px;
    }
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
  flex: 0 0 50px;
  margin-inline-start: 4px;
}
</style>
