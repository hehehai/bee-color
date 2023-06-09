import type { Color } from '@/utils/color'

export interface HSB {
  h: number | string,
  s: number | string,
  b: number | string
}

export interface RGB {
  r: number | string,
  g: number | string,
  b: number | string
}

export interface HSBA extends HSB {
  a: number
}

export interface RGBA extends RGB {
  a: number
}

export type ColorGenInput<T = Color> =
  | string
  | number
  | RGB
  | RGBA
  | HSB
  | HSBA
  | T;

export type SliderHsbaColorType = 'hue' | 'alpha';

export type HsbaColorType = 'saturation' | SliderHsbaColorType;

export type TransformOffset = {
  x: number,
  y: number
};
