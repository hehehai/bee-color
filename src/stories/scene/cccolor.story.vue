<script lang="ts" setup>
import ColorPickerVue from '@/components/ColorPicker.vue'

// https://fffuel.co/cccolor/
</script>

<template>
  <Story title="颜色选择器">
    <Variant title="Slider">
      <div class="box">
        <ColorPickerVue />
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
