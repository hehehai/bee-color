<script lang="ts" setup>
import type { Color } from '@/utils/color'
import {
  ColorPickerPrefixCls,
  defaultColor,
  generateColor
} from '@/utils/color'
import Picker from './Picker.vue'
import Slider from './Slider.vue'
import ColorBlock from './ColorBlock.vue'
import { computed, toRefs } from 'vue'
import type { HsbaColorType } from '@/interface'
import { useColorState } from '@/hooks/useColorState'

const prefixCls = ColorPickerPrefixCls

interface ColorPickerProps {
  modelValue?: Color,
  defaultValue?: Color,
  // 是否禁用
  disabled?: boolean,
  // 是否禁用透明度
  disabledAlpha?: boolean,
  // 是否在 X 轴内部
  insideX?: boolean,
  // 透明背景
  ghost?: boolean,
  // 子组件的 props
  childProps?: {
    saturation?: unknown,
    hue?: unknown,
    alpha?: unknown
  }
}

const props = withDefaults(defineProps<ColorPickerProps>(), {
  modelValue: undefined,
  defaultValue: undefined,
  disabled: false,
  disabledAlpha: false,
  ghost: false
})

const emit = defineEmits<{
  (e: 'update:modelValue', color: Color): void,
  (e: 'change', color: Color, type: HsbaColorType): void,
  (e: 'changeComplete', color: Color, type: HsbaColorType): void
}>()

const { disabled, modelValue, defaultValue, disabledAlpha } = toRefs(props)

const [colorValue, setColorValue] = useColorState(defaultColor, {
  defaultValue,
  modelValue
})

const alphaColor = computed(() => {
  const rgb = generateColor(colorValue.value.toRgbString())
  rgb.setAlpha(1)
  return rgb.toRgbString()
})

const handleChange = (color: Color, type: HsbaColorType) => {
  setColorValue(color)
  emit('update:modelValue', color)
  emit('change', color, type)
}

const handleChangeComplete = (color: Color, type: HsbaColorType) => {
  emit('changeComplete', color, type)
}
</script>

<template>
  <div
    :class="[
      `${prefixCls}-panel`,
      { [`${prefixCls}-panel-card`]: !ghost },
      { [`${prefixCls}-panel-disabled`]: disabled },
    ]"
  >
    <Picker
      :model-value="colorValue"
      :disabled="disabled"
      v-bind="childProps?.saturation"
      @change="handleChange"
      @change-complete="handleChangeComplete"
    />
    <div :class="`${prefixCls}-slider-container`">
      <div
        :class="[
          `${prefixCls}-slider-group`,
          { [`${prefixCls}-slider-group-disabled-alpha`]: disabledAlpha },
        ]"
      >
        <Slider
          :model-value="colorValue"
          :handler-color="`hsl(${colorValue.toHsb().h},100%, 50%)`"
          :disabled="disabled"
          :inside-x="insideX"
          v-bind="childProps?.hue"
          @change="handleChange"
          @change-complete="handleChangeComplete"
        />
        <Slider
          v-if="!disabledAlpha"
          type="alpha"
          :gradient-colors="['rgba(255, 0, 4, 0) 0%', alphaColor]"
          :model-value="colorValue"
          :handler-color="colorValue.toRgbString()"
          :disabled="disabled"
          :inside-x="insideX"
          v-bind="childProps?.alpha"
          @change="handleChange"
          @change-complete="handleChangeComplete"
        />
      </div>
      <ColorBlock :color="colorValue.toRgbString()" />
    </div>
    <slot
      name="default"
      v-bind="{
        color: colorValue
      }"
    ></slot>
  </div>
</template>
