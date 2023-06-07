<script lang="ts" setup>
import { TransformOffset } from "@/interface";
import { PropType, computed } from "vue";

const props = defineProps({
  offset: {
    type: Object as PropType<TransformOffset>,
    default: () => ({
      x: 0,
      y: 0,
    }),
  },
});

const style = computed(() => {
  return {
    left: `${props.offset.x}px`,
    top: `${props.offset.y}px`,
  };
});
</script>

<template>
  <div
    :style="{
      position: 'absolute',
      zIndex: 1,
      ...style
    }"
  >
    <slot></slot>
  </div>
</template>
