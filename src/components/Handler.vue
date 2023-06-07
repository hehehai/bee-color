<script lang="ts" setup>
import { ColorPickerPrefixCls } from "@/utils/color";
import { PropType } from "vue";

const prefixCls = ColorPickerPrefixCls;

type HandlerSize = "default" | "small";

defineProps({
  size: {
    type: String as PropType<HandlerSize>,
    default: "default",
  },
  color: {
    type: String,
  },
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
