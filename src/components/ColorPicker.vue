<script lang="ts" setup>
import {
  Color,
  ColorPickerPrefixCls,
  defaultColor,
  generateColor,
} from "@/utils/color";
import Picker from "./Picker.vue";
import Slider from "./Slider.vue";
import ColorBlock from "./ColorBlock.vue";
import { PropType, computed, toRefs } from "vue";
import { ColorGenInput, HsbaColorType } from "@/interface";
import { useColorState } from "@/hooks/useColorState";

const hueColor = [
  "rgb(255, 0, 0) 0%",
  "rgb(255, 255, 0) 17%",
  "rgb(0, 255, 0) 33%",
  "rgb(0, 255, 255) 50%",
  "rgb(0, 0, 255) 67%",
  "rgb(255, 0, 255) 83%",
  "rgb(255, 0, 0) 100%",
];

const prefixCls = ColorPickerPrefixCls;
const props = defineProps({
  disabled: {
    type: Boolean,
    default: false,
  },
  modelValue: {
    type: [String, Number, Object] as PropType<ColorGenInput>,
  },
  defaultValue: {
    type: [String, Number, Object] as PropType<ColorGenInput>,
  },
  disabledAlpha: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["update:modelValue", "change", "changeComplete"]);

const { disabled, modelValue, defaultValue, disabledAlpha } = toRefs(props);

const [colorValue, setColorValue] = useColorState(defaultColor, {
  defaultValue,
  modelValue,
});

const alphaColor = computed(() => {
  const rgb = generateColor(colorValue.value.toRgbString());
  rgb.setAlpha(1);
  return rgb.toRgbString();
});

const handleChange = (color: Color, type?: HsbaColorType) => {
  setColorValue(color);
  emit("update:modelValue", color);
  emit("change", color, type);
};

const handleChangeComplete = (type?: HsbaColorType) => {
  emit("changeComplete", type);
};
</script>

<template>
  <div
    :class="[
      `${prefixCls}-panel`,
      { [`${prefixCls}-panel-disabled`]: disabled },
    ]"
  >
    <Picker
      :color="colorValue"
      @change="handleChange"
      @changeComplete="handleChangeComplete"
      :disabled="disabled"
    >
    </Picker>
    <div :class="`${prefixCls}-slider-container`">
      <div
        :class="[
          `${prefixCls}-slider-group`,
          { [`${prefixCls}-slider-group-disabled-alpha`]: disabledAlpha },
        ]"
      >
        <Slider
          :gradientColors="hueColor"
          :color="colorValue"
          :value="`hsl(${colorValue.toHsb().h},100%, 50%)`"
          @change="(color) => handleChange(color, 'hue')"
          @changeComplete="handleChangeComplete"
          :disabled="disabled"
        >
        </Slider>
        <Slider
          v-if="!disabledAlpha"
          type="alpha"
          :gradientColors="['rgba(255, 0, 4, 0) 0%', alphaColor]"
          :color="colorValue"
          :value="colorValue.toRgbString()"
          @change="(color) => handleChange(color, 'alpha')"
          @changeComplete="handleChangeComplete"
          :disabled="disabled"
        />
      </div>
      <ColorBlock :color="colorValue.toRgbString()"></ColorBlock>
    </div>
  </div>
</template>
