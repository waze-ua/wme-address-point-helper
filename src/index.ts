import { NAME, TRANSLATION } from './translations'
import { SETTINGS } from './settings'
import { APH } from './aph'
import { createPoint, createResidential, setAPHInstance } from './helpers'
import css from './style.css'

WMEUI.addTranslation(NAME, TRANSLATION)
WMEUI.addStyle(css)

let scriptSettings = new Settings(NAME, SETTINGS)

const BUTTONS = {
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

$(document).on('bootstrap.wme', () => {
  let instance = new APH(NAME, scriptSettings, BUTTONS)
  setAPHInstance(instance)
})
