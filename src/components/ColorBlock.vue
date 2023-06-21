<script lang="ts" setup>
import type { ColorGenInput } from '@/interface'
import { ColorPickerPrefixCls, generateColor } from '@/utils/color'
import { computed } from 'vue'

const prefixCls = ColorPickerPrefixCls

interface ColorBlockProps {
  color?: ColorGenInput
}

const props = withDefaults(defineProps<ColorBlockProps>(), {
  color: 'transparent'
})

const blockStyle = computed(() => ({
  background: typeof props.color === 'string' ? props.color : generateColor(props.color).toRgbString()
}))
</script>

<template>
  <div :class="`${prefixCls}-color-block`">
    <slot name="default" v-bind="{ color }">
      <div :class="`${prefixCls}-color-block-inner`" :style="blockStyle">
      </div>
    </slot>
  </div>
</template>
