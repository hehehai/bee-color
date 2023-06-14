<script lang="ts" setup>
import { ColorPickerPrefixCls } from '@/utils/color'

const prefixCls = ColorPickerPrefixCls

interface HandlerProps {
  color?: string
}

withDefaults(defineProps<HandlerProps>(), {
  size: 'default',
  color: 'transparent'
})
</script>

<template>
  <div
    :class="{
      [`${prefixCls}-handler`]: true
    }"
    :style="{
      backgroundColor: color,
    }"
  ></div>
</template>
