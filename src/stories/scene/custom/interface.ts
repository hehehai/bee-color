import type { Color } from '@/utils/color'

export interface PresetsItem<T = string | Color> {
  label: string,
  colors: T[]
}
