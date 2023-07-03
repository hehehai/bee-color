<script lang="ts" setup>
import type { Color } from '@/utils/color'
import { toRefs, ref } from 'vue'

interface HexInputProps {
  modelValue?: number,
  min?: number,
  max?: number
}

const props = withDefaults(defineProps<HexInputProps>(), {
  modelValue: 0,
  min: 0,
  max: 100
})

const emit = defineEmits<{
  (e: 'update:modelValue', val: number): void,
  (e: 'change', val: number): void
}>()

const { modelValue, min, max } = toRefs(props)

const inputRef = ref<HTMLInputElement | null>(null)

const setInputValue = (value: string) => {
  if (inputRef.value) {
    inputRef.value.value = value
  }
}

const handleChange = (val: number) => {
  emit('update:modelValue', val)
  emit('change', val)
}

const handleValueInput = (e: Event) => {
  const { value } = e.target as HTMLInputElement
  const originValue = Number(value)
  if (Number.isNaN(originValue)) {
    setInputValue(String(Math.trunc(modelValue.value)))
    return
  }

  const newVal = Math.min(Math.max(Math.trunc(originValue), min.value), max.value)

  handleChange(newVal)
}

</script>

<template>
  <div class="space-range-group">
    <div class="space-range-group-header">
      <div class="space-range-group-label">
        Hue
      </div>
      <input
        ref="inputRef"
        class="space-range-group-value"
        type="text"
        :value="Math.trunc(modelValue)"
        @input="handleValueInput"
      />
    </div>
    <Slider
      class="space-slider"
      :model-value="colorValue"
      :handler-color="`hsl(${colorHsb.h},100%, 50%)`"
      :inside-x="true"
      @change="(color) => handleChange(color, 'hue')"
      @change-complete="(color) => handleChangeComplete(color, 'hue')"
    >
      <template #handler="{ color }">
        <div class="space-handler">
          <div class="space-handler-inner" :style="{ backgroundColor: color }"></div>
        </div>
      </template>
    </Slider>
  </div>
</template>
