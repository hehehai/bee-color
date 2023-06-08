<script lang="ts" setup>
import { ColorPickerPrefixCls } from "@/utils/color";

const prefixCls = ColorPickerPrefixCls;

type HandlerSize = "default" | "small";

interface HandlerProps {
  size?: HandlerSize;
  color?: string;
}

withDefaults(defineProps<HandlerProps>(), {
  size: "default",
  color: "transparent",
});
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
