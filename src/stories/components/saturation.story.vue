<script lang="ts" setup>
import { logEvent } from 'histoire/client'
import Picker from '@/components/Picker.vue'
import type { Color } from '@/utils/color'
import { defaultColor } from '@/utils/color'
import { ref } from 'vue'
import type { HsbaColorType } from '@/interface'

const colorValue = ref(defaultColor)

const handleChange = (color: Color, type: HsbaColorType) => {
  logEvent('change', { color, type })
}

const handleChangeComplete = (color: Color, type: HsbaColorType) => {
  logEvent('change complete', { color, type })
}
</script>

<template>
  <Story title="饱和度选择">
    <Variant title="饱和度">
      <div class="box">
        <Picker
          :model-value="colorValue"
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
