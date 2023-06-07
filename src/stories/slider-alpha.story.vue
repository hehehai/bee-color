<script lang="ts" setup>
import Slider from "@/components/Slider.vue";
import { HsbaColorType } from "@/interface";
import { Color, defaultColor, generateColor } from "@/utils/color";
import { ref, watch } from "vue";

const hueColor = [
  "rgb(255, 0, 0) 0%",
  "rgb(255, 255, 0) 17%",
  "rgb(0, 255, 0) 33%",
  "rgb(0, 255, 255) 50%",
  "rgb(0, 0, 255) 67%",
  "rgb(255, 0, 255) 83%",
  "rgb(255, 0, 0) 100%",
];

const colorValue = ref(defaultColor);
const gradientColors = ref<string[]>([]);

const handleChange = (color: Color, type?: HsbaColorType) => {
  colorValue.value = color;
  console.log("change", type);
};

const handleChangeComplete = (type?: HsbaColorType) => {
  console.log("change complete", type);
};

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
  <Story title="滑块选择器">
    <Variant title="Alpha">
      <div class="box">
        <div class="row">
          <Slider
            :gradientColors="hueColor"
            :color="colorValue"
            :value="`hsl(${colorValue.toHsb().h},100%, 50%)`"
            @change="(color) => handleChange(color, 'hue')"
            @changeComplete="handleChangeComplete"
          />
        </div>

        <div class="row">
          <Slider
            type="alpha"
            :gradientColors="gradientColors"
            :color="colorValue"
            :value="colorValue.toRgbString()"
            @change="(color) => handleChange(color, 'alpha')"
            @changeComplete="handleChangeComplete"
          />
        </div>
      </div>
    </Variant>
  </Story>
</template>

<style>
.box {
  padding: 40px;
}

.row {
  width: 100%;
}

.row + .row {
  margin-top: 16px;
}
</style>
