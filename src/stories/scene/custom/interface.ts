import type { Color } from '@/utils/color'

export declare type ChangeEvent<T = string> = Event & {
  target: {
    value?: T | undefined
  }
};

export interface PresetsItem<T = string | Color> {
  label: string,
  colors: T[]
}
