<script lang="ts" setup>
import { useModelState } from '@/hooks/useModelState'
import { InputNumber } from '@arco-design/web-vue'
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
  (e: 'update:modelValue', step?: number): void,
  (e: 'change', step?: number): void
}>()

const { modelValue, defaultValue } = toRefs(props)

const [_value, setValue] = useModelState(undefined, {
  defaultValue,
  modelValue
})

const handleChange = (step?: number) => {
  setValue(step)
  emit('update:modelValue', step)
  emit('change', step)
}

</script>

<template>
  <InputNumber
    class="a-color-steppers"
    v-bind="$attrs"
    :model-value="_value"
    size="mini"
    :min="min"
    :max="max"
    @change="handleChange"
  />
</template>
