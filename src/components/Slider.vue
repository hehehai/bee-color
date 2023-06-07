<script lang="ts" setup>
import { HsbaColorType } from "@/interface";
import {
  Color,
  ColorPickerPrefixCls,
  calculateOffset,
  calculateColor,
} from "@/utils/color";
import { unrefElement } from "@/utils/vue-utils";
import { PropType, ref, toRefs } from "vue";
import { useColorDrag } from "@/hooks/useColorDrag";

import Palette from "./Palette.vue";
import Transform from "./Transform.vue";
import Handler from "./Handler.vue";
import Gradient from "./Gradient.vue";

const prefixCls = ColorPickerPrefixCls;
const props = defineProps({
  color: {
    type: Object as PropType<Color>,
    required: true,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  gradientColors: {
    type: Array as PropType<string[]>,
    default: () => []
  },
  direction: {
    type: String,
  },
  type: {
    type: String as PropType<HsbaColorType>,
    default: "hue",
  },
  value: {
    type: String,
  },
});

const emit = defineEmits(["change", "changeComplete"]);

const { color, value: _value, type, disabled } = toRefs(props);

const sliderRef = ref<HTMLDivElement | null>(null);
const transformRef = ref<HTMLDivElement | null>(null);

const [offset, onDragStartHandle] = useColorDrag({
  color,
  targetRef: transformRef,
  containerRef: sliderRef,
  calculate: (containerEl) => {
    const transformEl = unrefElement(transformRef);
    if (!containerEl || !transformEl) {
      return;
    }
    return calculateOffset(containerEl, transformEl, color.value, type.value);
  },
  onDragChange: (offsetValue) => {
    const transformEl = unrefElement(transformRef);
    const sliderEl = unrefElement(sliderRef);
    if (!transformEl || !sliderEl) {
      return;
    }
    emit(
      "change",
      calculateColor({
        offset: offsetValue,
        targetEl: transformEl,
        containerEl: sliderEl,
        color: color.value,
        type: type.value,
      })
    );
  },
  onDragChangeComplete() {
    emit("changeComplete", type);
  },
  direction: "x",
  disabledDrag: disabled,
});
</script>

<template>
  <div
    ref="sliderRef"
    :class="[`${prefixCls}-slider`, `${prefixCls}-slider-${type}`]"
    @mousedown="onDragStartHandle"
    @touchstart="onDragStartHandle"
  >
    <Palette>
      <Transform ref="transformRef" :offset="offset">
        <Handler size="small" :color="value"></Handler>
      </Transform>
      <Gradient :colors="gradientColors" :direction="direction" :type="type">
      </Gradient>
    </Palette>
  </div>
</template>
