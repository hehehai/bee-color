<script lang="ts" setup>
import {
  Color,
  ColorPickerPrefixCls,
  calculateOffset,
  calculateColor,
} from "@/utils/color";
import { unrefElement } from "@/utils/vue-utils";
import { useColorDrag } from "@/hooks/useColorDrag";

import Palette from "./Palette.vue";
import Transform from "./Transform.vue";
import Handler from "./Handler.vue";
import { PropType, ref, toRefs } from "vue";

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
});

const emit = defineEmits(["change", "changeComplete"]);

const { color, disabled } = toRefs(props);

const pickerRef = ref<HTMLDivElement | null>(null);
const transformRef = ref<HTMLDivElement | null>(null);

const [offset, onDragStartHandle] = useColorDrag({
  color,
  containerRef: pickerRef,
  targetRef: transformRef,
  calculate: (containerEl) => {
    const transformEl = unrefElement(transformRef);
    if (!containerEl || !transformEl) {
      return;
    }
    return calculateOffset(containerEl, transformEl, color.value);
  },
  onDragChange: (offsetValue) => {
    const transformEl = unrefElement(transformRef);
    const pickerEl = unrefElement(pickerRef);
    if (!transformEl || !pickerEl) {
      return;
    }

    emit(
      "change",
      calculateColor({
        offset: offsetValue,
        targetEl: transformEl,
        containerEl: pickerEl,
        color: color.value,
      })
    );
  },
  onDragChangeComplete() {
    emit("changeComplete");
  },
  disabledDrag: disabled,
});
</script>

<template>
  <div
    ref="pickerRef"
    :class="`${prefixCls}-select`"
    @mousedown="onDragStartHandle"
    @touchstart="onDragStartHandle"
  >
    <Palette>
      <Transform ref="transformRef" :offset="offset">
        <Handler :color="color.toRgbString()"></Handler>
      </Transform>
      <div
        :class="`${prefixCls}-saturation`"
        :style="{
          backgroundColor: `hsl(${color.toHsb().h},100%, 50%)`,
          backgroundImage:
            'linear-gradient(0deg, #000, transparent),linear-gradient(90deg, #fff, hsla(0, 0%, 100%, 0))',
        }"
      ></div>
    </Palette>
  </div>
</template>
