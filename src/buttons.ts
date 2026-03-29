import { NAME } from './translations'
import { createPoint, createResidential } from './helpers'

export function getButtons() {
  return {
    A: {
      title: '<span class="chip"><i class="w-icon w-icon-node"></i>' + I18n.t(NAME).buttons.createPoint + '</span>',
      description: I18n.t(NAME).buttons.createPoint,
      shortcut: 'A+G',
      callback: () => createPoint()
    },
    B: {
      title: '<span class="chip"><i class="w-icon w-icon-home"></i>' + I18n.t(NAME).buttons.createResidential + '</span>',
      description: I18n.t(NAME).buttons.createResidential,
      shortcut: 'A+H',
      callback: () => createResidential()
    },
  }
}
