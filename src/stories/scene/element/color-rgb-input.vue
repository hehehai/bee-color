<script lang="ts" setup>
import { useColorState } from '@/hooks/useColorState'
import type { Color } from '@/utils/color'
import { generateColor } from '@/utils/color'
import { toRefs } from 'vue'
import ColorSteppers from './color-steppers.vue'
import type { RGB } from '@/index'

interface RgbInputProps {
  modelValue?: Color,
  defaultValue?: Color
}

const props = withDefaults(defineProps<RgbInputProps>(), {
  modelValue: undefined,
  defaultValue: undefined
})

const emit = defineEmits<{
  (e: 'update:modelValue', val: Color): void,
  (e: 'change', val: Color): void
}>()

const { modelValue, defaultValue } = toRefs(props)

const [rgbValue, setRgbValue] = useColorState(generateColor('#000'), {
  defaultValue,
  modelValue
})

const handleRgbChange = (step: number | null, type: keyof RGB) => {
  const rgb = rgbValue.value.toRgb()
  rgb[type] = step || 0
  const genColor = generateColor(rgb)
  setRgbValue(genColor)
  emit('update:modelValue', genColor)
  emit('change', genColor)
}
</script>

<template>
  <div class="my-color-rgb-input">
    <ColorSteppers
      :min="0"
      :max="255"
      :model-value="rgbValue.toRgb().r"
      @change="(step: number) => handleRgbChange(Number(step), 'r')"
    />
    <ColorSteppers
      :min="0"
      :max="255"
      :model-value="rgbValue.toRgb().g"
      @change="(step: number) => handleRgbChange(Number(step), 'g')"
    />
    <ColorSteppers
      :min="0"
      :max="255"
      :model-value="rgbValue.toRgb().b"
      @change="(step: number) => handleRgbChange(Number(step), 'b')"
    />
  </div>
</template>
