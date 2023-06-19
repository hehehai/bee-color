<script lang="ts" setup>
import { useModelState } from '@/hooks/useModelState'
import { ElInputNumber } from 'element-plus'
import { toRefs } from 'vue'

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

const handleChange = (step?: number) => {
  if (step !== undefined) {
    setValue(step)
    emit('update:modelValue', step)
    emit('change', step)
  }
}

</script>

<template>
  <ElInputNumber
    class="my-color-steppers"
    controls-position="right"
    v-bind="$attrs"
    :model-value="_value"
    size="small"
    :min="min"
    :max="max"
    :controls="false"
    @change="handleChange"
  />
</template>
