<script lang="ts" setup>
import { computed, ref } from 'vue'
import IconColorPicker from './icons/icon-color-picker.vue'
import IconCopy from './icons/icon-copy.vue'
import { baseColorMenus, ColorMenu } from './constants'
// import Picker from './spaces/picker.vue'
import HSB from './spaces/hsb.vue'

declare global {
  interface Window {
    EyeDropper?: any
  }
}

const customMenus = ref([
  {
    value: 'like',
    label: 'Live'
  }
])

let eyeDropper: any = null

if ('EyeDropper' in window) {
  eyeDropper = new window.EyeDropper()
}

const activeMenu = ref<ColorMenu | string>(ColorMenu.picker)
const menuVisible = ref(false)

const colorMenus = computed(() => [...baseColorMenus, ...customMenus.value])

const activeMenuLabel = computed(() => {
  const menu = colorMenus.value.find((item) => item.value === activeMenu.value)
  return menu?.label
})

const handleMenuSelectClick = () => {
  menuVisible.value = !menuVisible.value
}

const handleSelect = (key: ColorMenu | string) => {
  activeMenu.value = key
  menuVisible.value = false
}

const handleClickEyeDropper = async () => {
  try {
    if (eyeDropper) {
      const result = await eyeDropper.open()
      console.log(result)
    }
  } catch (err) {
    console.log(err)
  }
}
</script>

<template>
  <Story title="coolors" icon="heroicons:wrench-screwdriver">
    <Variant title="Slider">
      <div class="box">
        <div class="coolors-color-picker">
          <div class="color-inspector_panel">
            <div class="color-inspector-spaces">
              <!-- <Picker /> -->
              <HSB />
            </div>
            <div v-if="menuVisible" class="color-inspector_menu">
              <template v-for="item in colorMenus" :key="item.value">
                <div
                  class="color-inspector_menu-item"
                  :class="{ active: item.value === activeMenu }"
                  @click="handleSelect(item.value)"
                >
                  {{ item.label }}
                </div>
              </template>
            </div>
          </div>
          <div class="color-inspector_control">
            <div class="color-inspector_select" :class="{ open: menuVisible }" @click="handleMenuSelectClick()">
              <div class="color-inspector_select__current">
                {{ activeMenuLabel }}
              </div>
              <div class="color-inspector_select-arrow"></div>
            </div>
            <div class="color-inspector_tools">
              <div class="color-inspector_tools-item" @click="handleClickEyeDropper">
                <IconColorPicker />
              </div>
              <div class="color-inspector_tools-item">
                <IconCopy />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Variant>
  </story>
</template>

<style lang="less">
.box {
  padding: 40px;
  // height: 300px;
  display: flex;
  justify-content: center;
}

.coolors-color-picker {
  width: 300px;
  height: 100%;
  position: relative;
  box-shadow: rgba(0, 0, 0, 0.1) 0 0 0 1px;
  border-radius: 14px;
  background: white;
  overflow: hidden;

  .color-inspector_panel {
    position: relative;
    max-height: calc(100% - 46px);
    height: 100%;
  }

  .color-inspector_control {
    box-shadow: rgba(0, 0, 0, 0.075) 0 -1px;
    height: 46px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 15px;
    z-index: 2;
    position: relative;
    font-size: 14px;
  }

  .color-inspector-spaces {
    height: 100%;
  }

  .color-inspector_menu {
    height: 100%;
    width: 100%;
    background: #ffffff;
    overflow: auto;
    z-index: 2;
    padding: 10px;
  }

  .color-inspector_menu-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;
    padding: 10px 12px;
    overflow: hidden;
    font-size: 14px;
    cursor: pointer;
    border-radius: 6px;
    color: black;

    &:hover,
    &.active {
      background: #f2f2f3;
    }
  }

  .color-inspector_select {
    padding: 0 5px;
    cursor: pointer;
    display: flex;
    align-items: center;

    &:hover {
      color: #0066ff;
    }

    &.open {
      .color-inspector_select-arrow {
        transform: rotate(-135deg);
        margin-bottom: -5px;
      }
    }
  }

  .color-inspector_select-arrow {
    margin-left: 6px;
    margin-bottom: 3px;
    box-sizing: border-box;
    width: 8px;
    height: 8px;
    border: solid currentColor;
    border-width: 0 1.5px 1.5px 0;
    transform: rotate(45deg);

  }

  .color-inspector_tools {
    display: flex;
    align-items: center;

    .color-inspector_tools-item+.color-inspector_tools-item {
      margin-left: 8px;
    }
  }

  .color-inspector_tools-item {
    display: inline-flex;
    cursor: pointer;
    color: #7d7c83;
    font-size: 20px;

    &:hover {
      color: #000
    }
  }

.space-select {
  height: 142px;
  margin-bottom: 18px;

  .bee-color-palette {
    overflow: visible;
  }
}

.space-slider {
  --bee-color-handler-width-small-size: 16px;
  --bee-color-handler-height-small-size: 16px;
  --bee-color-handler-radius: 50%;
  --bee-color-inner-border-radius: 5px;

  --bee-color-slider-height: 10px;
}

.space-handler {
  border-radius: 15px;
  box-shadow: rgba(0, 0, 0, 0.15) 0 0 0 1px, rgba(0, 0, 0, 0.05) 0 10px 10px -5px;
  cursor: -webkit-grab;
  width: 20px;
  height: 20px;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;

  .space-handler-inner {
    border-radius: 50%;
    width: 10px;
    height: 10px;
    pointer-events: none;
    box-shadow: inset rgba(0, 0, 0, 0.15) 0 0 0 1px;
  }
}

.space-input {
  position: relative;
  margin-top: 18px;

  .space-input-control {
    transition: box-shadow .1s;
    box-shadow: inset #d8d8da 0 0 0 1px, inset white 0 0 0 100px;
    border: none;
    width: 100%;
    color: black;
    font-family: "Inter", sans-serif;
    outline: none;
    border-radius: 8px;
    padding: 0 10px;
    width: 100%;
    height: 36px;
    font-size: 14px;
  }

  .space-input-color-block {
    --bee-color-block-width: 24px;
    --bee-color-block-height: 24px;
    --bee-color-inner-border-radius: 4px;

    margin-left: 8px;
    right: 6px;
    box-shadow: inset rgba(0, 0, 0, 0.075) 0 0 0 1px;
    position: absolute;
    top: 50%;
    transform: translate3d(0, -50%, 0);
  }
}
}
</style>

<docs lang="md">
# coolors
> // https://coolors.co/9da594

1. 自定义面板
2. 选择器
3. picker
4. 各颜色模式选择
5. 颜色拾取器

🙃 soon
</docs>
