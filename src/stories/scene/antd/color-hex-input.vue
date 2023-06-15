<script lang="ts" setup>
import type { Color } from '@/utils/color'
import { generateColor, isHexString, toHexFormat } from '@/utils/color'
import { ref, toRefs, watch } from 'vue'
import { Input } from 'ant-design-vue'
import type { ChangeEvent } from './interface'

interface HexInputProps {
  modelValue?: Color
}

const props = withDefaults(defineProps<HexInputProps>(), {
  modelValue: undefined
})

const emit = defineEmits<{
  (e: 'update:modelValue', val: Color): void,
  (e: 'change', val?: Color): void
}>()

const { modelValue } = toRefs(props)

const hexValue = ref(modelValue.value?.toHex())

watch(modelValue, (val) => {
  const hex = val?.toHex()
  if (isHexString(hex) && val) {
    hexValue.value = toHexFormat(hex)
  }
}, {
  immediate: true
})

const handleHexChange = (e: ChangeEvent) => {
  const originValue = e.target.value
  hexValue.value = toHexFormat(originValue)
  const hex = toHexFormat(originValue, true)
  if (isHexString(hex)) {
    const hexColor = generateColor(hex)
    emit('update:modelValue', hexColor)
    emit('change', hexColor)
  }
}
</script>

<template>
  <Input
    class="antd-color-hex-input"
    prefix="#"
    size="small"
    :value="hexValue?.toUpperCase()"
    @change="handleHexChange"
  />
</template>
