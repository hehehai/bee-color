import { ColorGenInput } from "@/interface";
import { Color, defaultColor, generateColor } from "@/utils/color";
import { Ref, computed, ref } from "vue";

type ColorValue = ColorGenInput | undefined;

function hasValue(value: ColorValue) {
  return value !== undefined;
}

export function useColorState(
  initialColor = defaultColor,
  option: {
    defaultValue?: Ref<ColorValue>;
    modelValue?: Ref<ColorValue>;
  }
) {
  const { defaultValue, modelValue } = option;
  const color = ref<Color>(
    hasValue(defaultValue?.value)
      ? generateColor(defaultValue?.value!)
      : initialColor
  );

  const computedColor = computed<Color>(() =>
    hasValue(modelValue?.value)
      ? generateColor(modelValue?.value!)
      : color.value
  );

  const setColor = (newColor: ColorValue) => {
    if (newColor) {
       color.value = generateColor(newColor);
    }
  };

  return [computedColor, setColor] as const;
}
