<script lang="ts" setup>
import { useColorState } from '@/hooks/useColorState'
import type { Color } from '@/utils/color'
import { generateColor, getRoundNumber } from '@/utils/color'
import { toRefs } from 'vue'
import ColorSteppers from './color-steppers.vue'
import type { HSB } from '@/index'

interface HsbInputProps {
  modelValue?: Color,
  defaultValue?: Color
}

const props = withDefaults(defineProps<HsbInputProps>(), {
  modelValue: undefined,
  defaultValue: undefined
})

const emit = defineEmits<{
  (e: 'update:modelValue', val: Color): void,
  (e: 'change', val: Color): void
}>()

const { modelValue, defaultValue } = toRefs(props)

const [hsbValue, setHsbValue] = useColorState(generateColor('#000'), {
  defaultValue,
  modelValue
})

const handleHsbChange = (step: number, type: keyof HSB) => {
  const hsb = hsbValue.value.toHsb()
  hsb[type] = type === 'h' ? step : (step || 0) / 100
  const genColor = generateColor(hsb)
  setHsbValue(genColor)
  emit('update:modelValue', genColor)
  emit('change', genColor)
}
</script>

<template>
  <div class="a-color-hsb-input">
    <ColorSteppers
      :min="0"
      :max="360"
      :model-value="hsbValue.toHsb().h"
      :formatter="(step: number) => getRoundNumber(step || 0).toString()"
      @change="(step: number) => handleHsbChange(Number(step), 'h')"
    />
    <ColorSteppers
      :min="0"
      :max="100"
      :model-value="hsbValue.toHsb().s * 100"
      :formatter="(step: number) => `${getRoundNumber(step || 0)}%`"
      @change="(step: number) => handleHsbChange(Number(step), 's')"
    />
    <ColorSteppers
      :min="0"
      :max="100"
      :model-value="hsbValue.toHsb().b * 100"
      :formatter="(step: number) => `${getRoundNumber(step || 0)}%`"
      @change="(step: number) => handleHsbChange(Number(step), 'b')"
    />
  </div>
</template>
