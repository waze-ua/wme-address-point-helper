import { NAME, TRANSLATION } from './translations'
import { SETTINGS } from './settings'
import { getButtons } from './buttons'
import { APH } from './aph'
import { setAPHInstance } from './helpers'
import css from './style.css'

WMEUI.addTranslation(NAME, TRANSLATION)
WMEUI.addStyle(css)

let scriptSettings = new Settings(NAME, SETTINGS)

$(document).on('bootstrap.wme', () => {
  let instance = new APH(NAME, scriptSettings, getButtons())
  setAPHInstance(instance)
})
