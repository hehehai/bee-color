<script lang="ts" setup>
import Slider from "@/components/Slider.vue";
import { SliderHsbaColorType } from "@/interface";
import { Color, defaultColor, generateColor } from "@/utils/color";
import { ref, watch } from "vue";

const colorValue = ref(defaultColor);

const handleChange = (color: Color, type: SliderHsbaColorType) => {
  colorValue.value = color;
  console.log("change", color, type);
};

const handleChangeComplete = (color: Color, type: SliderHsbaColorType) => {
  console.log("change complete", color, type);
};

const alphaGradientColors = ref<string[]>([]);
const changeAlphaColor = (color: Color) => {
  const rgb = generateColor(color.toRgbString());
  rgb.setAlpha(1);
  alphaGradientColors.value = ["rgba(255, 0, 4, 0) 0%", rgb.toRgbString()];
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
            :value="colorValue"
            :handler-color="`hsl(${colorValue.toHsb().h},100%, 50%)`"
            @change="handleChange"
            @changeComplete="handleChangeComplete"
          />
        </div>

        <div class="row">
          <Slider
            type="alpha"
            :gradientColors="alphaGradientColors"
            :value="colorValue"
            :handler-color="colorValue.toRgbString()"
            @change="handleChange"
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
