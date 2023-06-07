<script lang="ts" setup>
import { ColorPickerPrefixCls } from "@/utils/color";

const prefixCls = ColorPickerPrefixCls;

defineProps({
  color: {
    type: String,
  },
});
</script>

<template>
  <div :class="`${prefixCls}-color-block`">
    <div :class="`${prefixCls}-color-block-inner`" :style="{ background: color }"></div>
  </div>
</template>
