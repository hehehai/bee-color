<script lang="ts" setup>
import { type Color, Color as RcColor, generateColor, defaultColor } from '@/utils/color'
import type { PresetsItem } from './interface'
import { computed, ref, toRefs } from 'vue'
import { Collapse, CollapseItem } from '@arco-design/web-vue'
import { ColorBlock } from '@/components'
import { useColorState } from '@/hooks/useColorState'

const colorBgElevated = '#ffffff'

const genPresetColor = (list: PresetsItem[]) =>
  list.map((value) => {
    value.colors = value.colors.map(generateColor)
    return value
  }) as PresetsItem<Color>[]

const isBright = (value: Color, bgColorToken: string) => {
  const { r, g, b, a } = value.toRgb()
  const hsv = new RcColor(value.toRgbString()).onBackground(bgColorToken).toHsv()
  if (a <= 0.5) {
    // Adapted to dark mode
    return hsv.v > 0.5
  }
  return r * 0.299 + g * 0.587 + b * 0.114 > 192
}

interface SliderProps {
  presets?: PresetsItem[],
  modelValue?: Color,
  defaultValue?: Color,
  emptyText?: string
}

const props = withDefaults(defineProps<SliderProps>(), {
  presets: () => [],
  modelValue: undefined,
  defaultValue: undefined,
  emptyText: '暂无'
})

const emit = defineEmits<{
  (e: 'update:modelValue', color?: Color): void,
  (e: 'change', color?: Color): void
}>()

const { modelValue, defaultValue } = toRefs(props)

const [colorValue, setColorValue] = useColorState(defaultColor, {
  defaultValue,
  modelValue
})

const presets = computed(() => genPresetColor(props.presets))

const activePresetKeys = ref(presets.value.map((item) => `panel-${item.label}`))

const handlePresetChange = (color: Color) => {
  setColorValue(color)
  emit('update:modelValue', color)
  emit('change', color)
}

</script>

<template>
  <div class="my-color-presets">
    <Collapse v-model:active-key="activePresetKeys" :bordered="false">
      <CollapseItem v-for="preset in presets" :key="`panel-${preset.label}`">
        <template #header>
          <div class="my-color-presets-label">
            {{ preset.label }}
          </div>
        </template>
        <div v-if="preset.colors?.length" class="my-color-presets-items">
          <template v-for="colorItem in preset.colors" :key="`preset-${colorItem.toRgbString()}`">
            <ColorBlock
              :class="[`my-color-presets-block`, {
                [`my-color-presets-block-checked`]:
                  colorItem.toRgbString() === colorValue?.toRgbString(),
                [`my-color-presets-block-bright`]: isBright(colorItem, colorBgElevated),
              }]"
              :color="colorItem.toRgbString()"
              @click="handlePresetChange(colorItem)"
            />
          </template>
        </div>
        <span v-else class="my-color-presets-empty">{{ emptyText }}</span>
      </CollapseItem>
    </Collapse>
  </div>
</template>

<style lang="less">
.my-color-presets {
  .arco-collapse-item-header {
    padding-top: 2px;
    padding-bottom: 2px;
  }

  .arco-collapse-item-header-left {
    padding-right: 12px;
    padding-left: 22px;
    border-color: transparent;
  }

  .arco-collapse-item {
    border-bottom: none;

    .arco-collapse-item-icon-hover {
      left: 0px;
    }
  }

  .arco-collapse-item-content {
    padding-left: 2px;
    padding-right: 2px;
    background: transparent;
  }

  &-label {
    font-size: 12px;
    color: rgba(0, 0, 0, 0.88);
    line-height: 1.7;
  }

  &-items {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
  }

  &-block {
    --bee-color-block-width: 19.8px;
    --bee-color-block-height: 19.8px;

    position: relative;
    cursor: pointer;

    &::before {
      box-sizing: border-box;
      content: "";
      pointer-events: none;
      width: 23.8px;
      height: 23.8px;
      position: absolute;
      top: -2px;
      inset-inline-start: -2px;
      border-radius: 6px;
      border: 1px solid transparent;
      transition: border-color 0.2s cubic-bezier(0.71, -0.46, 0.88, 0.6);
    }

    &:hover::before {
      border-color: rgba(0, 0, 0, 0.15);
    }

    &::after {
      box-sizing: border-box;
      position: absolute;
      top: 50%;
      inset-inline-start: 23.2%;
      display: table;
      width: 7.2px;
      height: 11px;
      border: 2px solid #fff;
      border-top: 0;
      border-inline-start: 0;
      transform: rotate(45deg) scale(0) translate(-50%, -50%);
      opacity: 0;
      content: "";
      transition: all 0.1s cubic-bezier(0.71, -0.46, 0.88, 0.6), opacity 0.1s;
    }
  }

  &-block-checked {
    &::after {
      opacity: 1;
      border-color: #fff;
      transform: rotate(45deg) scale(1) translate(-50%, -50%);
      transition: transform 0.2s cubic-bezier(0.12, 0.4, 0.29, 1.46) 0.1s;
    }

    &.my-color-presets-block-bright {
      &::after {
        border-color: rgba(0, 0, 0, 0.45);
      }
    }
  }

  &-empty {
    font-size: 12px;
    color: rgba(0, 0, 0, 0.25);
  }
}
</style>
