<script lang="ts" setup>
import Slider from "@/components/Slider.vue";
import { SliderHsbaColorType } from "@/interface";
import { Color, generateColor } from "@/utils/color";
import { ref } from "vue";

const colorValue = ref(generateColor("rgb(0, 255, 0)"));

const handleChange = (color: Color, type: SliderHsbaColorType) => {
  console.log("change", color, type);
};

const handleChangeComplete = (color: Color, type: SliderHsbaColorType) => {
  console.log("change complete", color, type);
};
</script>

<template>
  <Story title="hue条">
    <Variant title="Slider">
      <div class="box">
        <Slider
          v-model="colorValue"
          :handler-color="`hsl(${colorValue.toHsb().h},100%,50%)`"
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
