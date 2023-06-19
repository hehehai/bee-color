<script lang="ts" setup>
import ColorBlock from '@/components/ColorBlock.vue'
import { generateColor } from '@/utils/color'
import { ref } from 'vue'

const color = ref(generateColor('blue'))

</script>

<template>
  <Story
    title="颜色块"
    icon="heroicons:cube-20-solid"
  >
    <Variant title="色块">
      <div class="box">
        <ColorBlock :color="color" />
      </div>
    </Variant>
  </story>
</template>

<style>
.box {
  padding: 40px;
  display: flex;
  justify-content: center;
}
</style>
