<script lang="ts" setup>
import { useColorState } from '@/hooks/useColorState'
import type { Color } from '@/utils/color'
import { generateColor, getAlphaColor } from '@/utils/color'
import { toRefs } from 'vue'
import ColorSteppers from './color-steppers.vue'

interface AlphaInputProps {
  modelValue?: Color,
  defaultValue?: Color
}

const props = withDefaults(defineProps<AlphaInputProps>(), {
  modelValue: undefined,
  defaultValue: undefined
})

const emit = defineEmits<{
  (e: 'update:modelValue', val: Color): void,
  (e: 'change', val: Color): void
}>()

const { modelValue, defaultValue } = toRefs(props)

const [alphaValue, setAlphaValue] = useColorState(generateColor('#000'), {
  defaultValue,
  modelValue
})

const handleAlphaChange = (step: number) => {
  const hsba = alphaValue.value.toHsb()
  hsba.a = (step || 0) / 100
  const genColor = generateColor(hsba)
  setAlphaValue(genColor)
  emit('update:modelValue', genColor)
  emit('change', genColor)
}
</script>

<template>
  <ColorSteppers
    class="antd-color-alpha-input"
    :min="0"
    :max="255"
    :formatter="(step: number) => `${step}%`"
    :model-value="getAlphaColor(alphaValue)"
    @change="handleAlphaChange"
  />
</template>
