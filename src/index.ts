import { NAME } from './name'
import { TRANSLATION } from './translations'
import { SETTINGS } from './settings'
import { getButtons } from './buttons'
import { APH } from './aph'
import { setAPHInstance } from './helpers'
import css from './style.css'

$(document).on('bootstrap.wme', () => {
  WMEUI.addTranslation(NAME, TRANSLATION)
  WMEUI.addStyle(css)

  let scriptSettings = new Settings(NAME, SETTINGS)
  let instance = new APH(NAME, scriptSettings, getButtons())
  setAPHInstance(instance)
})
