export enum ColorMenu {
  picker = 'Picker',
  hsb = 'HSB',
  hsl = 'HSL',
  rgb = 'RGB',
  cmyk = 'CMYK',
  lab = 'LAB',
  name = 'Name',
}

export const baseColorMenus = [
  ColorMenu.picker,
  ColorMenu.hsb,
  ColorMenu.rgb,
  ColorMenu.cmyk,
  ColorMenu.lab,
  ColorMenu.name
].map((format) => ({
  value: format,
  label: format
}))
