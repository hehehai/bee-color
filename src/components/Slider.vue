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
  // 是否禁用
  disabled?: boolean,
  // 渐变色数组
  gradientColors?: string[],
  // 滑块的方向
  direction?: string,
  // 滑块的类型
  type?: SliderHsbaColorType,
  // 滑块的颜色
  handlerColor?: string,
  // 是否在 X 轴内部
  insideX?: boolean,
  // 子组件的 props
  childProps?: {
    handler?: unknown,
    gradient?: unknown
  }
}

const props = withDefaults(defineProps<SliderProps>(), {
  modelValue: undefined,
  defaultValue: undefined,
  disabled: false,
  gradientColors: undefined,
  direction: undefined,
  type: 'hue',
  handlerColor: undefined,
  insideX: false
})

const emit = defineEmits<{
  (e: 'update:modelValue', color: Color): void,
  (e: 'change', color: Color, type: SliderHsbaColorType): void,
  (e: 'changeComplete', color: Color, type: SliderHsbaColorType): void
}>()

const { modelValue, defaultValue, type, disabled, insideX, childProps } = toRefs(props)

const [colorValue, setColorValue] = useColorState(defaultColor, {
  defaultValue,
  modelValue
})

const sliderRef = ref(null)
const transformRef = ref(null)

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
    return calculateOffset({
      containerEl,
      targetEl: transformEl,
      color: colorValue.value,
      type: type.value,
      insideX: insideX.value
    })
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
        type: type.value,
        insideX: insideX.value
      }),
      type.value
    )
  },
  onDragChangeComplete() {
    emit('changeComplete', colorValue.value, type.value)
  },
  direction: 'x',
  disabledDrag: disabled,
  insideX
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
        <slot
          name="handler"
          v-bind="{
            color: handlerColor ?? colorValue.toRgbString(),
          }"
        >
          <Handler
            :color="handlerColor ?? colorValue.toRgbString()"
            size="small"
            v-bind="childProps?.handler"
          />
        </slot>
      </Transform>
      <Gradient
        :colors="gradientColors"
        :direction="direction"
        :type="type"
        v-bind="childProps?.gradient"
      />
    </Palette>
  </div>
</template>
