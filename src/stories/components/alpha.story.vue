<script lang="ts" setup>
import { logEvent } from 'histoire/client'
import Slider from '@/components/Slider.vue'
import type { HsbaColorType } from '@/interface'
import type { Color } from '@/utils/color'
import { defaultColor, generateColor } from '@/utils/color'
import { ref, watch } from 'vue'

const colorValue = ref(defaultColor)

const handleChange = (color: Color, type: HsbaColorType) => {
  logEvent('change', { color, type })
}

const handleChangeComplete = (color: Color, type: HsbaColorType) => {
  logEvent('change complete', { color, type })
}

const gradientColors = ref<string[]>([])
const changeAlphaColor = (color: Color) => {
  const rgb = generateColor(color.toRgbString())
  rgb.setAlpha(1)
  gradientColors.value = ['rgba(255, 0, 4, 0) 0%', rgb.toRgbString()]
}

watch(colorValue, changeAlphaColor, {
  immediate: true
})
</script>

<template>
  <Story title="透明度选择">
    <Variant title="Alpha">
      <div class="box">
        <Slider
          type="alpha"
          :gradient-colors="gradientColors"
          :model-value="colorValue"
          :handler-color="colorValue.toRgbString()"
          @change="handleChange"
          @change-complete="handleChangeComplete"
        />
      </div>
    </Variant>
  </Story>
</template>

<style>
.box {
  padding: 40px;
  display: flex;
  justify-content: center;
}
</style>
