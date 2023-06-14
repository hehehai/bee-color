<script lang="ts" setup>
import type { SliderHsbaColorType } from '@/interface'
import type { Color } from '@/utils/color'
import {
  ColorPickerPrefixCls,
  calculateOffset,
  calculateColor,
  defaultColor
} from '@/utils/color'
import { unrefElement } from '@/utils/vue-utils'
import { ref, toRefs } from 'vue'
import type { useColorDragProps } from '@/hooks/useColorDrag'
import { useColorDrag } from '@/hooks/useColorDrag'

import Palette from './Palette.vue'
import Transform from './Transform.vue'
import Handler from './Handler.vue'
import Gradient from './Gradient.vue'
import { useColorState } from '@/hooks/useColorState'

const prefixCls = ColorPickerPrefixCls

interface SliderProps {
  modelValue?: Color,
  defaultValue?: Color,
  disabled?: boolean,
  gradientColors?: string[],
  direction?: string,
  type?: SliderHsbaColorType,
  handlerColor?: string
}

const props = withDefaults(defineProps<SliderProps>(), {
  modelValue: undefined,
  defaultValue: undefined,
  disabled: false,
  gradientColors: undefined,
  direction: undefined,
  type: 'hue',
  handlerColor: undefined
})

const emit = defineEmits<{
  (e: 'update:modelValue', color: Color): void,
  (e: 'change', color: Color, type: SliderHsbaColorType): void,
  (e: 'changeComplete', color: Color, type: SliderHsbaColorType): void
}>()

const { modelValue, defaultValue, type, disabled } = toRefs(props)

const [colorValue, setColorValue] = useColorState(defaultColor, {
  defaultValue,
  modelValue
})

const sliderRef = ref<HTMLDivElement | null>(null)
const transformRef = ref<HTMLDivElement | null>(null)

const handleChange = (color: Color, type: SliderHsbaColorType) => {
  setColorValue(color)
  emit('update:modelValue', color)
  emit('change', color, type)
}

const dragProps: useColorDragProps = {
  color: colorValue,
  targetRef: transformRef,
  containerRef: sliderRef,
  calculate: (containerEl) => {
    const transformEl = unrefElement(transformRef)
    if (!containerEl || !transformEl) {
      return undefined
    }
    return calculateOffset(
      containerEl,
      transformEl,
      colorValue.value,
      type.value
    )
  },
  onDragChange: (offsetValue) => {
    const transformEl = unrefElement(transformRef)
    const sliderEl = unrefElement(sliderRef)
    if (!transformEl || !sliderEl) {
      return
    }
    handleChange(
      calculateColor({
        offset: offsetValue,
        targetEl: transformEl,
        containerEl: sliderEl,
        color: colorValue.value,
        type: type.value
      }),
      type.value
    )
  },
  onDragChangeComplete() {
    emit('changeComplete', colorValue.value, type.value)
  },
  direction: 'x',
  disabledDrag: disabled
}

const [offset, onDragStartHandle] = useColorDrag(dragProps)
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
        <Handler
          :color="handlerColor ?? colorValue.toRgbString()"
        />
      </Transform>
      <Gradient :colors="gradientColors" :direction="direction" :type="type" />
    </Palette>
  </div>
</template>
