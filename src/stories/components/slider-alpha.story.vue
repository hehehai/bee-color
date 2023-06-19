<script lang="ts" setup>
import { logEvent } from 'histoire/client'
import Slider from '@/components/Slider.vue'
import type { HsbaColorType } from '@/interface'
import type { Color } from '@/utils/color'
import { defaultColor, generateColor } from '@/utils/color'
import { ref, watch } from 'vue'

const colorValue = ref(defaultColor)

const handleChange = (color: Color, type: HsbaColorType) => {
  colorValue.value = color
  logEvent('change', { color, type })
}

const handleChangeComplete = (color: Color, type: HsbaColorType) => {
  logEvent('change complete', { color, type })
}

const alphaGradientColors = ref<string[]>([])
const changeAlphaColor = (color: Color) => {
  const rgb = generateColor(color.toRgbString())
  rgb.setAlpha(1)
  alphaGradientColors.value = ['rgba(255, 0, 4, 0) 0%', rgb.toRgbString()]
}

watch(colorValue, changeAlphaColor, {
  immediate: true
})
</script>

<template>
  <Story title="滑块选择" icon="heroicons:cube-20-solid">
    <Variant title="色相 + 透明度">
      <div class="box-2">
        <div class="row">
          <Slider
            :model-value="colorValue"
            :handler-color="`hsl(${colorValue.toHsb().h},100%, 50%)`"
            @change="handleChange"
            @change-complete="handleChangeComplete"
          />
        </div>

        <div class="row">
          <Slider
            type="alpha"
            :gradient-colors="alphaGradientColors"
            :model-value="colorValue"
            :handler-color="colorValue.toRgbString()"
            @change="handleChange"
            @change-complete="handleChangeComplete"
          />
        </div>
      </div>
    </Variant>
  </Story>
</template>

<style>
.box-2 {
  padding: 40px;
}

.row {
  width: 100%;
}

.row + .row {
  margin-top: 16px;
}
</style>
