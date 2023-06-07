<script lang="ts" setup>
import { HsbaColorType } from "@/interface";
import { Color, ColorPickerPrefixCls, generateColor } from "@/utils/color";
import { PropType, computed } from "vue";

const prefixCls = ColorPickerPrefixCls;

const props = defineProps({
  direction: {
    type: String,
    default: "to right",
  },
  colors: {
    type: Array as PropType<(Color | string)[]>,
    default: () => [],
  },
  type: {
    type: String as PropType<HsbaColorType>,
  },
});

const gradientColors = computed(() => {
  return props.colors
    .map((color, idx) => {
      const result = generateColor(color);
      if (props.type === "alpha" && idx === props.colors.length - 1) {
        result.setAlpha(1);
      }
      return result.toRgbString();
    })
    .join(",");
});
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
