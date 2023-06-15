import type { MaybeElementRef } from '@/utils/vue-utils'
import { unrefElement } from '@/utils/vue-utils'
import { computed, watch } from 'vue'

/**
 * @see https://vueuse.org/useResizeObserver
 * Reports changes to the dimensions of an Element's content or the border-box
 *
 * @param target
 * @param callback
 */
export function useResizeObserver(
  target: MaybeElementRef | MaybeElementRef[],
  callback: ResizeObserverCallback
) {
  let observer: ResizeObserver | undefined

  const cleanup = () => {
    if (observer) {
      observer.disconnect()
      observer = undefined
    }
  }

  const targets = computed(() =>
    Array.isArray(target)
      ? target.map(el => unrefElement(el))
      : [unrefElement(target)]
  )

  const stopWatch = watch(
    targets,
    (els) => {
      cleanup()
      if (window) {
        observer = new ResizeObserver(callback)
        for (const _el of els) {
          _el && observer!.observe(_el, {
            box: 'content-box'
          })
        }
      }
    },
    { immediate: true, flush: 'post', deep: true }
  )

  const stop = () => {
    cleanup()
    stopWatch()
  }

  return {
    stop
  }
}

export type UseResizeObserverReturn = ReturnType<typeof useResizeObserver>
