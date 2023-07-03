<script lang="ts" setup>
import type { Color } from '@/utils/color'
import {
  defaultColor,
  toHexFormat,
  isHexString,
  generateColor
} from '@/utils/color'
import { toRefs, computed } from 'vue'
import { Picker, Slider, ColorBlock } from '@/components'
import { useColorState } from '@/hooks/useColorState'

interface ColorPickerProps {
  modelValue?: Color,
  defaultValue?: Color
}

const props = withDefaults(defineProps<ColorPickerProps>(), {
  modelValue: undefined,
  defaultValue: undefined
})

const emit = defineEmits<{
  (e: 'update:modelValue', color: Color): void,
  (e: 'change', color: Color, type: 'saturation' | 'hue' | 'hex'): void,
  (e: 'changeComplete', color: Color, type: 'saturation' | 'hue' | 'hex'): void
}>()

const { modelValue, defaultValue } = toRefs(props)

const [colorValue, setColorValue] = useColorState(defaultColor, {
  defaultValue,
  modelValue
})

const colorHex = computed(() => colorValue.value.toHexString().toUpperCase())

const handleChange = (color: Color, type: 'saturation' | 'hue' | 'hex') => {
  setColorValue(color)
  emit('update:modelValue', color)
  emit('change', color, type)
}

const handleChangeComplete = (color: Color, type: 'saturation' | 'hue' | 'hex') => {
  emit('changeComplete', color, type)
}

const handleInputHex = (e: Event) => {
  const { value } = e.target as HTMLInputElement
  const hex = toHexFormat(value)
  // NOTE: 输入框显示不同步，需要调整
  if (isHexString(hex)) {
    const hexColor = generateColor(hex)
    handleChange(hexColor, 'hex')
  }
}

</script>

<template>
  <div class="space-picker">
    <Picker
      class="space-select"
      :model-value="colorValue"
      @change="handleChange"
      @change-complete="handleChangeComplete"
    >
      <template #handler="{ color }">
        <div class="space-handler">
          <div class="space-handler-inner" :style="{ backgroundColor: color }"></div>
        </div>
      </template>
    </Picker>
    <Slider
      class="space-slider"
      :model-value="colorValue"
      :handler-color="`hsl(${colorValue.toHsb().h},100%, 50%)`"
      :inside-x="true"
      @change="(color) =>handleChange(color, 'hue')"
      @change-complete="(color) => handleChangeComplete(color, 'hue')"
    >
      <template #handler="{ color }">
        <div class="space-handler">
          <div class="space-handler-inner" :style="{ backgroundColor: color }"></div>
        </div>
      </template>
    </Slider>
    <div class="space-input">
      <input
        class="space-input-control"
        type="text"
        :value="colorHex"
        :placeholder="colorHex"
        @input="handleInputHex"
      />
      <ColorBlock class="space-input-color-block" :color="colorValue.toRgbString()" />
    </div>
  </div>
</template>

<style lang="less">
.space-picker {
  --bee-color-inner-border-radius: 8px;
  height: 100%;
  padding: 15px 15px 10px 15px
}
</style>
