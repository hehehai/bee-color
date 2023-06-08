<script lang="ts" setup>
import { TransformOffset } from "@/interface";
import { computed } from "vue";

interface TransformProps {
  offset?: TransformOffset;
}

const props = withDefaults(defineProps<TransformProps>(), {
  offset: () => ({
    x: 0,
    y: 0,
  }),
});

const offsetStyle = computed(() => ({
  left: `${props.offset.x}px`,
  top: `${props.offset.y}px`,
}));
</script>

<template>
  <div
    :style="{
      position: 'absolute',
      zIndex: 1,
      ...offsetStyle,
    }"
  >
    <slot></slot>
  </div>
</template>
