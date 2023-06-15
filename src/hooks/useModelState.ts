import type { Ref } from 'vue'
import { computed, ref } from 'vue'

export function useModelState<T>(
  initialValue?: T,
  options?: {
    defaultValue?: Ref<T>,
    modelValue?: Ref<T>
  }
) {
  const { defaultValue, modelValue } = options ?? {}

  const _value = ref(defaultValue?.value ?? initialValue) as Ref<T | undefined>

  const computedColor = computed(() => modelValue?.value ?? _value.value)

  const setState = (newVal: T | undefined) => {
    _value.value = newVal
  }

  return [computedColor, setState] as const
}
