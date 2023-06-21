<script lang="ts" setup>
import { useModelState } from '@/hooks/useModelState'
import { computed, toRefs } from 'vue'
import type { ChangeEvent } from './interface'

interface StepperProps {
  modelValue?: number,
  defaultValue?: number,
  min?: number,
  max?: number
}

const props = withDefaults(defineProps<StepperProps>(), {
  modelValue: undefined,
  defaultValue: undefined,
  min: 0,
  max: 100
})

const emit = defineEmits<{
  (e: 'update:modelValue', step: number): void,
  (e: 'change', step: number): void
}>()

const { modelValue, defaultValue } = toRefs(props)

const [_value, setValue] = useModelState(undefined, {
  defaultValue,
  modelValue
})

const intValue = computed(() => {
  if (_value.value === undefined) return undefined
  return Number.parseInt(_value.value.toString())
})

const handleChange = (e: Event) => {
  const step = (e as ChangeEvent<number>).target.value
  if (step !== undefined) {
    setValue(step)
    emit('update:modelValue', step)
    emit('change', step)
  }
}

</script>

<template>
  <input
    class="my-color-steppers"
    type="number"
    v-bind="$attrs"
    :value="intValue"
    :min="min"
    :max="max"
    @input="handleChange"
  />
</template>
