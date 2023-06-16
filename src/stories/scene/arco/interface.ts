import type { Color } from '@/utils/color'

export declare type ChangeEvent = Event & {
  target: {
    value?: string | undefined
  }
};

export interface PresetsItem<T = string | Color> {
  label: string,
  colors: T[]
}
