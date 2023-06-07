<script lang="ts" setup>
import Picker from "@/components/Picker.vue";
import { Color, defaultColor } from "@/utils/color";
import { ref } from "vue";

const colorValue = ref(defaultColor);

const handleChange = (color: Color) => {
  colorValue.value = color;
};

const handleChangeComplete = () => {
  console.log("change complete");
};
</script>

<template>
  <Story title="饱和度选择器">
    <Variant title="Saturation">
      <div class="box">
        <Picker
          :color="colorValue"
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
