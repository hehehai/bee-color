<script lang="ts" setup>
import ColorPicker from '@/components/ColorPicker.vue'
</script>

<template>
  <Story
    title="颜色选择器面板"
    icon="heroicons:cube-20-solid"
  >
    <Variant title="Slider">
      <div class="box">
        <ColorPicker />
      </div>
    </Variant>
  </story>
</template>

<style>
.box {
  padding: 40px;
  display: flex;
  justify-content: center;
}
</style>
