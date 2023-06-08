<script lang="ts" setup>
import Picker from "@/components/Picker.vue";
import { Color, defaultColor } from "@/utils/color";
import { ref } from "vue";

const colorValue = ref(defaultColor);

const handleChange = (color: Color, type: "saturation") => {
  console.log("change", color, type);
};

const handleChangeComplete = (color: Color, type: "saturation") => {
  console.log("change complete", color, type);
};
</script>

<template>
  <Story title="饱和度选择器">
    <Variant title="Saturation">
      <div class="box">
        <Picker
          :value="colorValue"
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
