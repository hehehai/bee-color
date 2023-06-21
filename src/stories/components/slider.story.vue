<script lang="ts" setup>
import { logEvent } from 'histoire/client'
import Slider from '@/components/Slider.vue'
import type { HsbaColorType } from '@/interface'
import type { Color } from '@/utils/color'
import { generateColor } from '@/utils/color'
import { ref } from 'vue'

const colorValue = ref(generateColor('rgb(0, 255, 0)'))

const handleChange = (color: Color, type: HsbaColorType) => {
  logEvent('change', { color, type })
}

const handleChangeComplete = (color: Color, type: HsbaColorType) => {
  logEvent('change complete', { color, type })
}
</script>

<template>
  <Story title="色相选择" icon="heroicons:cube-20-solid">
    <Variant title="普通">
      <div class="box">
        <Slider
          v-model="colorValue"
          :handler-color="`hsl(${colorValue.toHsb().h},100%,50%)`"
          @change="handleChange"
          @change-complete="handleChangeComplete"
        />
      </div>
    </Variant>
    <Variant title="自定义样式">
      <div class="box">
        <Slider
          v-model="colorValue"
          class="custom"
          :handler-color="`hsl(${colorValue.toHsb().h},100%,50%)`"
        />
      </div>
    </Variant>
    <Variant title="内部">
      <div class="box">
        <Slider
          v-model="colorValue"
          class="inside"
          :inside-x="true"
          :child-props="{
            handler: {
              class: 'inside-handler'
            }
          }"
          :handler-color="`hsl(${colorValue.toHsb().h},100%,50%)`"
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

.custom {
  --bee-color-handler-width-small-size: 16px;
  --bee-color-handler-height-small-size: 28px;
  --bee-color-handler-radius: 6px;

  --bee-color-slider-height: 20px;
}

.inside {
  --bee-color-handler-width-small-size: 16px;
  --bee-color-handler-height-small-size: 16px;
  --bee-color-handler-radius: 50%;

  --bee-color-slider-height: 20px;

  .inside-handler {
    margin-left: 2px;
    margin-right: 2px;
  }
}
</style>
