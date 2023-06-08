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
import { computed, toRefs } from "vue";
import { HsbaColorType } from "@/interface";
import { useColorState } from "@/hooks/useColorState";

const prefixCls = ColorPickerPrefixCls;

interface ColorPickerProps {
  modelValue?: Color;
  defaultValue?: Color;
  disabled?: boolean;
  disabledAlpha?: boolean;
}

const props = withDefaults(defineProps<ColorPickerProps>(), {
  disabled: false,
  disabledAlpha: false,
});

const emit = defineEmits<{
  (e: "update:modelValue", color: Color): void;
  (e: "change", color: Color, type: HsbaColorType): void;
  (e: "changeComplete", color: Color, type: HsbaColorType): void;
}>();

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

const handleChange = (color: Color, type: HsbaColorType) => {
  setColorValue(color);
  emit("update:modelValue", color);
  emit("change", color, type);
};

const handleChangeComplete = (color: Color, type: HsbaColorType) => {
  emit("changeComplete", color, type);
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
          :value="colorValue"
          :handler-color="`hsl(${colorValue.toHsb().h},100%, 50%)`"
          @change="handleChange"
          @changeComplete="handleChangeComplete"
          :disabled="disabled"
        >
        </Slider>
        <Slider
          v-if="!disabledAlpha"
          type="alpha"
          :gradientColors="['rgba(255, 0, 4, 0) 0%', alphaColor]"
          :value="colorValue"
          :handler-color="colorValue.toRgbString()"
          @change="handleChange"
          @changeComplete="handleChangeComplete"
          :disabled="disabled"
        />
      </div>
      <ColorBlock :color="colorValue.toRgbString()"></ColorBlock>
    </div>
  </div>
</template>
