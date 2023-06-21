<script lang="ts" setup>
import type { HsbaColorType } from '@/interface'
import {
  ColorPickerPrefixCls,
  defaultHueColors,
  generateColor
} from '@/utils/color'
import { computed } from 'vue'

const prefixCls = ColorPickerPrefixCls

interface GradientProps {
  colors?: string[],
  direction?: string,
  // 渐变类型
  type?: HsbaColorType
}

const props = withDefaults(defineProps<GradientProps>(), {
  colors: undefined,
  direction: 'to right',
  type: 'hue'
})

const gradientColors = computed(() => {
  const mergeColors =
    props.colors ?? (props.type === 'hue' ? defaultHueColors : [])

  return mergeColors
    .map((color, idx) => {
      const result = generateColor(color)
      if (props.type === 'alpha' && idx === mergeColors.length - 1) {
        result.setAlpha(1)
      }
      return result.toRgbString()
    })
    .join(',')
})
</script>

<template>
  <div
    :class="`${prefixCls}-gradient`"
    :style="{
      position: 'absolute',
      inset: 0,
      background: `linear-gradient(${direction}, ${gradientColors})`,
    }"
  >
    <slot></slot>
  </div>
</template>
