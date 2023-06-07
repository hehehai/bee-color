<script lang="ts" setup>
import { ColorPickerPrefixCls } from "@/utils/color";

const prefixCls = ColorPickerPrefixCls;
</script>

<template>
  <div :class="`${prefixCls}-palette`" :style="{ position: 'relative' }">
    <slot></slot>
  </div>
</template>
