<script lang="ts" setup>
import type { Color } from '@/utils/color'
import {
  defaultColor,
  generateColor
} from '@/utils/color'
import { toRefs, computed, ref } from 'vue'
import { Slider } from '@/components'
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
  (e: 'change', color: Color, type: 'saturation' | 'hue' | 'brightness'): void,
  (e: 'changeComplete', color: Color, type: 'saturation' | 'hue' | 'brightness'): void
}>()

const { modelValue, defaultValue } = toRefs(props)

const [colorValue, setColorValue] = useColorState(defaultColor, {
  defaultValue,
  modelValue
})

const colorHsb = computed(() => colorValue.value.toHsb())

const handleChange = (color: Color, type: 'saturation' | 'hue' | 'brightness') => {
  setColorValue(color)
  emit('update:modelValue', color)
  emit('change', color, type)
}

const handleChangeComplete = (color: Color, type: 'saturation' | 'hue' | 'brightness') => {
  emit('changeComplete', color, type)
}

const inputRef = ref<HTMLInputElement | null>(null)

const setInputValue = (value: string) => {
  if (inputRef.value) {
    inputRef.value.value = value
  }
}

const handleValueInput = (e: Event, type: 'saturation' | 'hue' | 'brightness') => {
  const { value } = e.target as HTMLInputElement
  const originValue = Number(value)
  if (Number.isNaN(originValue)) {
    setInputValue(String(Math.trunc(colorHsb.value[type.slice(0, 1)])))
    return
  }
  const color = colorValue.value
  let { h, s, b } = color.toHsb()

  switch (type) {
    case 'saturation':
      s = Math.min(Math.max(originValue, 0), 100)
      break
    case 'hue':
      h = Math.min(Math.max(originValue, 0), 360)
      break
    case 'brightness':
      b = Math.min(Math.max(originValue, 0), 100)
      break
  }
  const newColor = generateColor(`hsb(${h}, ${s}%, ${b}%)`)
  handleChange(newColor, type)
}

</script>

<template>
  <div class="space-hsb">
    <div class="space-range-group">
      <div class="space-range-group-header">
        <div class="space-range-group-label">
          Hue
        </div>
        <input
          ref="inputRef"
          class="space-range-group-value"
          type="text"
          :value="Math.trunc(colorHsb.h)"
          @change="handleValueInput($event, 'hue')"
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
  </div>
</template>

<style lang="less">
.space-hsb {
  height: 100%;
  padding: 15px;
}

.space-range-group {
  margin-bottom: 15px;

  .space-range-group-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
  }

  .space-range-group-label {
    font-variation-settings: "wght" 500;
    line-height: 26px;
  }

  .space-range-group-value {
    width: 40px;
    transition: box-shadow .1s;
    border: none;
    color: black;
    font-family: "Inter",sans-serif;
    border-radius: 6px;
    padding: 0 10px;
    height: 26px;
    padding-left: 5px;
    padding-right: 5px;
    text-align: center;
    outline: none;

    &:focus,
    &:hover {
      box-shadow: inset #0066ff 0 0 0 1px, inset white 0 0 0 100px;
    }
  }
}
</style>
