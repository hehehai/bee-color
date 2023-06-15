import type { ColorInput, HSVA, Numberify } from '@ctrl/tinycolor'
import { TinyColor } from '@ctrl/tinycolor'
import type {
  ColorGenInput,
  HSB,
  HSBA,
  HsbaColorType,
  TransformOffset
} from '@/interface'

export const getRoundNumber = (value: number) => Math.round(Number(value || 0))

const convertHsb2Hsv = (color: ColorGenInput): ColorInput => {
  if (color && typeof color === 'object' && 'h' in color && 'b' in color) {
    const { b, ...resets } = color as HSB
    return {
      ...resets,
      v: b
    }
  }
  if (typeof color === 'string' && /hsb/.test(color)) {
    return color.replace(/hsb/, 'hsv')
  }
  return color as ColorInput
}

export class Color extends TinyColor {
  constructor(color: ColorGenInput) {
    super(convertHsb2Hsv(color))
  }

  toHsbString() {
    const hsb = this.toHsb()
    const saturation = getRoundNumber(hsb.s * 100)
    const lightness = getRoundNumber(hsb.b * 100)
    const hue = getRoundNumber(hsb.h)
    const alpha = hsb.a
    const hsbString = `hsb(${hue}, ${saturation}%, ${lightness}%)`
    const hsbaString = `hsba(${hue}, ${saturation}%, ${lightness}%, ${alpha.toFixed(
      alpha === 0 ? 0 : 2
    )})`
    return alpha === 1 ? hsbString : hsbaString
  }

  toHsb(): Numberify<HSBA> {
    let hsv = this.toHsv()
    if (typeof this.originalInput === 'object' && this.originalInput) {
      if ('h' in this.originalInput) {
        hsv = this.originalInput as Numberify<HSVA>
      }
    }

    const { v: _v, ...resets } = hsv
    return {
      ...resets,
      b: hsv.v
    }
  }
}

export const generateColor = (color: ColorGenInput): Color => {
  if (color instanceof Color) {
    return color
  }
  return new Color(color)
}

export const getAlphaColor = (color: Color) => getRoundNumber(color.toHsb().a * 100)

export const toHexFormat = (value?: string, alpha?: boolean) =>
  value?.replace(/[^\w/]/gi, '').slice(0, alpha ? 8 : 6) || ''

const hexReg = /(^#[\da-f]{6}$)|(^#[\da-f]{8}$)/i

export const isHexString = (hex?: string) => hexReg.test(`#${hex}`)

export const getHex = (value?: string, alpha?: boolean) => (value ? toHexFormat(value, alpha) : '')

export const ColorPickerPrefixCls = 'bee-color'

export const defaultColor = generateColor('#1677ff')

export const defaultHueColors = [
  'rgb(255, 0, 0) 0%',
  'rgb(255, 255, 0) 17%',
  'rgb(0, 255, 0) 33%',
  'rgb(0, 255, 255) 50%',
  'rgb(0, 0, 255) 67%',
  'rgb(255, 0, 255) 83%',
  'rgb(255, 0, 0) 100%'
]

export const defaultAlphaStartColor = 'rgba(255, 0, 4, 0) 0%'

export const calculateColor = (props: {
  offset: TransformOffset,
  containerEl: HTMLDivElement,
  targetEl: HTMLDivElement,
  color: Color,
  type?: HsbaColorType
}): Color => {
  const { offset, targetEl, containerEl, color, type } = props
  const { width, height } = containerEl.getBoundingClientRect()
  const { width: targetWidth, height: targetHeight } =
    targetEl.getBoundingClientRect()
  const centerOffsetX = targetWidth / 2
  const centerOffsetY = targetHeight / 2
  const saturation = (offset.x + centerOffsetX) / width
  const bright = 1 - (offset.y + centerOffsetY) / height
  const hsb = color.toHsb()
  const alphaOffset = saturation
  const hueOffset = ((offset.x + centerOffsetX) / width) * 360

  if (type) {
    switch (type) {
      case 'hue':
        return generateColor({
          ...hsb,
          h: hueOffset <= 0 ? 0 : hueOffset
        })
      case 'alpha':
        return generateColor({
          ...hsb,
          a: alphaOffset <= 0 ? 0 : alphaOffset
        })
    }
  }

  return generateColor({
    h: hsb.h,
    s: saturation <= 0 ? 0 : saturation,
    b: bright >= 1 ? 1 : bright,
    a: hsb.a
  })
}

export const calculateOffset = (
  containerEl: HTMLDivElement,
  targetEl: HTMLDivElement,
  color: Color,
  type?: HsbaColorType
): TransformOffset | undefined => {
  const { width, height } = containerEl.getBoundingClientRect()
  const { width: targetWidth, height: targetHeight } =
    targetEl.getBoundingClientRect()
  const centerOffsetX = targetWidth / 2
  const centerOffsetY = targetHeight / 2
  const hsb = color.toHsb()

  // Exclusion of boundary cases
  // targetWidth !== targetHeight
  if (
    (targetWidth === 0 && targetHeight === 0)
  ) {
    return
  }

  if (type) {
    switch (type) {
      case 'hue':
        return {
          x: (hsb.h / 360) * width - centerOffsetX,
          y: -centerOffsetY / 3
        }
      case 'alpha':
        return {
          x: (hsb.a / 1) * width - centerOffsetX,
          y: -centerOffsetY / 3
        }
    }
  }

  return {
    x: hsb.s * width - centerOffsetX,
    y: (1 - hsb.b) * height - centerOffsetY
  }
}
