import type { MaybeRef } from './../utils/vue-utils'
import type { Ref } from 'vue'
import { unref, onBeforeUnmount, ref, watch } from 'vue'
import type { Color } from '@/utils/color'
import { type MaybeElementRef, unrefElement } from '@/utils/vue-utils'
import type { TransformOffset } from '@/interface'
import { useResizeObserver } from './useResizeObserver'

type EventType = MouseEvent | TouchEvent;

type EventHandle = (e: EventType) => void;

export interface useColorDragProps {
  color?: Ref<Color | undefined>, // 颜色
  offset?: Ref<TransformOffset>, // 偏移量
  containerRef: MaybeElementRef, // 容器元素
  targetRef: MaybeElementRef, // 目标元素
  direction?: 'x' | 'y', // 方向
  onDragChange?: (offset: TransformOffset) => void, // 拖拽时的回调函数
  onDragChangeComplete?: () => void, // 拖拽结束时的回调函数
  calculate?: (containerRef: HTMLElement) => TransformOffset | undefined, // 计算偏移量的函数
  /** Disabled drag */
  disabledDrag?: Ref<boolean>, // 是否禁用拖拽
  insideX?: MaybeRef<boolean> // 是否内部 - 仅限制 x 轴
}

function getPosition(e: EventType) {
  const obj = 'touches' in e ? e.touches[0] : e
  const scrollXOffset =
    document.documentElement.scrollLeft ||
    document.body.scrollLeft ||
    window.pageXOffset
  const scrollYOffset =
    document.documentElement.scrollTop ||
    document.body.scrollTop ||
    window.pageYOffset
  return { pageX: obj.pageX - scrollXOffset, pageY: obj.pageY - scrollYOffset }
}

export function useColorDrag(props: useColorDragProps) {
  const {
    offset,
    targetRef,
    containerRef,
    direction,
    onDragChange,
    onDragChangeComplete,
    calculate,
    color,
    disabledDrag,
    insideX = ref(false)
  } = props
  const offsetValue = ref<TransformOffset>(offset?.value ?? { x: 0, y: 0 }) // 偏移量的值
  const setOffsetValue = (val: TransformOffset) => {
    offsetValue.value = val
  }

  let dragFlag = false

  const rectify = () => {
    const refEl = unrefElement(containerRef)
    if (!dragFlag && refEl) {
      const calcOffset = calculate?.(refEl)
      if (calcOffset) {
        setOffsetValue(calcOffset)
      }
    }
  }

  // FIX: 动画缩放元素内，初始化元素大小不正确
  useResizeObserver([containerRef, targetRef], rectify)

  watch(
    [containerRef, color, insideX],
    rectify,
    {
      immediate: true
    }
  )

  const updateOffset: EventHandle = (e) => {
    const containerEl = unrefElement(containerRef)
    const targetEl = unrefElement(targetRef)
    if (!containerEl || !targetEl) {
      return
    }
    const { pageX, pageY } = getPosition(e)
    const {
      x: rectX,
      y: rectY,
      width,
      height
    } = containerEl.getBoundingClientRect()
    const { width: targetWidth, height: targetHeight } =
      targetEl.getBoundingClientRect()

    const centerOffsetX = targetWidth / 2
    const centerOffsetY = targetHeight / 2

    const sideWidth = unref(insideX) ? centerOffsetX : 0

    const offsetX = Math.max(sideWidth, Math.min(pageX - rectX, width - sideWidth)) - centerOffsetX
    const offsetY = Math.max(0, Math.min(pageY - rectY, height)) - centerOffsetY

    const calcOffset = {
      x: offsetX,
      y: direction === 'x' ? offsetValue.value.y : offsetY
    }

    // Exclusion of boundary conditions
    // targetWidth !== targetHeight
    if (
      (targetWidth === 0 && targetHeight === 0)
    ) {
      return
    }

    setOffsetValue(calcOffset)
    onDragChange?.(calcOffset)
  }

  const onDragMove: EventHandle = (e) => {
    e.preventDefault()
    updateOffset(e)
  }

  const onDragStop: EventHandle = (e) => {
    e.preventDefault()
    dragFlag = false
    unListen()
    onDragChangeComplete?.()
  }

  function unListen() {
    document.removeEventListener('mousemove', onDragMove)
    document.removeEventListener('mouseup', onDragStop)
    document.removeEventListener('touchmove', onDragMove)
    document.removeEventListener('touchend', onDragStop)
  }

  const onDragStart: EventHandle = (e) => {
    if (disabledDrag?.value) {
      return
    }
    updateOffset(e)
    dragFlag = true
    document.addEventListener('mousemove', onDragMove)
    document.addEventListener('mouseup', onDragStop)
    document.addEventListener('touchmove', onDragMove)
    document.addEventListener('touchend', onDragStop)
  }

  onBeforeUnmount(unListen)

  return [offsetValue, onDragStart] as const
}
