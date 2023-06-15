<script lang="ts" setup>
import { ColorPickerPrefixCls } from '@/utils/color'

const prefixCls = ColorPickerPrefixCls

interface HandlerProps {
  color?: string,
  size?: 'default' | 'small'
}

withDefaults(defineProps<HandlerProps>(), {
  size: 'default',
  color: 'transparent'
})
</script>

<template>
  <div
    :class="{
      [`${prefixCls}-handler`]: true,
      [`${prefixCls}-handler-sm`]: size === 'small',
    }"
    :style="{
      backgroundColor: color,
    }"
  ></div>
</template>
