import { NAME } from './name'
import { createPoint, createResidential } from './helpers'

export function getButtons() {
  return {
    A: {
      title: '<span class="chip"><i class="w-icon w-icon-node"></i>' + WMEUI.t(NAME).buttons.createPoint + '</span>',
      description: WMEUI.t(NAME).buttons.createPoint,
      shortcut: 'A+G',
      callback: () => createPoint()
    },
    B: {
      title: '<span class="chip"><i class="w-icon w-icon-home"></i>' + WMEUI.t(NAME).buttons.createResidential + '</span>',
      description: WMEUI.t(NAME).buttons.createResidential,
      shortcut: 'A+H',
      callback: () => createResidential()
    },
  }
}
