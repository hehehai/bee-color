<script lang="ts" setup>
import Slider from "@/components/Slider.vue";
import { Color, defaultColor } from "@/utils/color";
import { ref } from "vue";

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

const handleChange = (color: Color) => {
  colorValue.value = color;
};

const handleChangeComplete = () => {
  console.log("change complete");
};
</script>

<template>
  <Story title="hue条">
    <Variant title="Slider">
      <div class="box">
        <Slider
          :gradientColors="hueColor"
          :color="colorValue"
          :value="`hsl(${colorValue.toHsb().h},100%, 50%)`"
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
