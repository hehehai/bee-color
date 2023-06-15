<script lang="ts" setup>
import type { Color } from '@/utils/color'
import {
  ColorPickerPrefixCls,
  calculateOffset,
  calculateColor,
  defaultColor
} from '@/utils/color'
import { unrefElement } from '@/utils/vue-utils'
import { useColorDrag } from '@/hooks/useColorDrag'

import Palette from './Palette.vue'
import Transform from './Transform.vue'
import Handler from './Handler.vue'
import { ref, toRefs } from 'vue'
import { useColorState } from '@/hooks/useColorState'

const prefixCls = ColorPickerPrefixCls

interface PickerProps {
  modelValue?: Color,
  defaultValue?: Color,
  disabled?: boolean
}

const props = withDefaults(defineProps<PickerProps>(), {
  modelValue: undefined,
  defaultValue: undefined,
  disabled: false
})

const emit = defineEmits<{
  (e: 'update:modelValue', color: Color): void,
  (e: 'change', color: Color, type: 'saturation'): void,
  (e: 'changeComplete', color: Color, type: 'saturation'): void
}>()

const { modelValue, defaultValue, disabled } = toRefs(props)

const [colorValue, setColorValue] = useColorState(defaultColor, {
  defaultValue,
  modelValue
})

const pickerRef = ref<HTMLDivElement | null>(null)
const transformRef = ref<HTMLDivElement | null>(null)

const handleChange = (color: Color) => {
  setColorValue(color)
  emit('update:modelValue', color)
  emit('change', color, 'saturation')
}

const [offset, onDragStartHandle] = useColorDrag({
  color: colorValue,
  containerRef: pickerRef,
  targetRef: transformRef,
  calculate: (containerEl) => {
    const transformEl = unrefElement(transformRef)
    if (!containerEl || !transformEl) {
      return
    }
    return calculateOffset(containerEl, transformEl, colorValue.value)
  },
  onDragChange: (offsetValue) => {
    const transformEl = unrefElement(transformRef)
    const pickerEl = unrefElement(pickerRef)
    if (!transformEl || !pickerEl) {
      return
    }

    handleChange(
      calculateColor({
        offset: offsetValue,
        targetEl: transformEl,
        containerEl: pickerEl,
        color: colorValue.value
      })
    )
  },
  onDragChangeComplete() {
    emit('changeComplete', colorValue.value, 'saturation')
  },
  disabledDrag: disabled
})
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
        <Handler color="transparent" />
      </Transform>
      <div
        :class="`${prefixCls}-saturation`"
        :style="{
          backgroundColor: `hsl(${colorValue.toHsb().h}, 100%, 50%)`,
          backgroundImage:
            'linear-gradient(0deg, rgb(0, 0, 0), transparent), linear-gradient(90deg, rgb(255, 255, 255), rgba(255, 255, 255, 0))',
        }"
      ></div>
    </Palette>
  </div>
</template>
