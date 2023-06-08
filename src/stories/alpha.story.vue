<script lang="ts" setup>
import Slider from "@/components/Slider.vue";
import { SliderHsbaColorType } from "@/interface";
import { Color, defaultColor, generateColor } from "@/utils/color";
import { ref, watch } from "vue";

const colorValue = ref(defaultColor);

const handleChange = (color: Color, type: SliderHsbaColorType) => {
  console.log("change", color, type);
};

const handleChangeComplete = (color: Color, type: SliderHsbaColorType) => {
  console.log("change complete", color, type);
};

const gradientColors = ref<string[]>([]);
const changeAlphaColor = (color: Color) => {
  const rgb = generateColor(color.toRgbString());
  rgb.setAlpha(1);
  gradientColors.value = ["rgba(255, 0, 4, 0) 0%", rgb.toRgbString()];
};

watch(colorValue, changeAlphaColor, {
  immediate: true,
});
</script>

<template>
  <Story title="透明条">
    <Variant title="Alpha">
      <div class="box">
        <Slider
          type="alpha"
          :gradientColors="gradientColors"
          :value="colorValue"
          :handler-color="colorValue.toRgbString()"
          @change="handleChange"
          @changeComplete="handleChangeComplete"
        />
      </div>
    </Variant>
  </Story>
</template>

<style>
.box {
  padding: 40px;
  display: flex;
  justify-content: center;
}
</style>
