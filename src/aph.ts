import { NAME } from './translations'
import { hasDuplicate } from './helpers'

export class APH extends WMEBase {
  panel: any

  constructor(name: string, settings: any, buttons: any) {
    super(name, settings)

    this.initTab()

    this.initShortcuts(buttons)

    this.initPanel(buttons)

    this.initHandlers()
  }

  /**
   * Initial UI elements
   */
  initTab() {
    /** @type {WMEUIHelperTab} */
    let tab = this.helper.createTab(
      WMEUI.t(NAME).title,
      {
        sidebar: this.wmeSDK.Sidebar,
        image: GM_info.script.icon
      }
    )

    // Setup options
    let fieldsetSettings = this.helper.createFieldset(WMEUI.t(NAME).settings.title)

    let checkboxes: Record<string, any> = {}
    for (let item in this.settings.container) {
      if (this.settings.container.hasOwnProperty(item)
        && WMEUI.t(NAME).settings[item]
        ) {
        checkboxes[item] = {
          title: WMEUI.t(NAME).settings[item],
          callback: (event: any) => this.settings.set(item, event.target.checked),
          checked: this.settings.get(item),
        }
      }
    }
    fieldsetSettings.addCheckboxes(checkboxes)
    tab.addElement(fieldsetSettings)

    tab.addText(
      'info',
      '<a href="' + GM_info.scriptUpdateURL + '">' + GM_info.script.name + '</a> ' + GM_info.script.version
    )

    tab.addText('blue', 'made in')
    tab.addText('yellow', 'Ukraine')
    tab.inject()
  }

  initShortcuts(buttons: any) {
    for (let btn in buttons) {
      if (buttons.hasOwnProperty(btn)) {
        let button = buttons[btn]
        if (button.shortcut) {
          this.createShortcut(btn, button.description, button.shortcut, button.callback)
        }
      }
    }
  }

  initPanel(buttons: any) {
    // Create a panel for POI
    this.panel = this.helper.createPanel(WMEUI.t(NAME).title)
    this.panel.addButtons(buttons)
  }

  initHandlers() {
    this.wmeSDK.Events.trackDataModelEvents({ dataModelName: "venues" })
    this.wmeSDK.Events.on({
      eventName: "wme-data-model-objects-changed",
      eventHandler: ({dataModelName, objectIds}: any) => {
        $('button.address-point-helper-A').prop('disabled', !this.validateForPoint())
        $('button.address-point-helper-B').prop('disabled', !this.validateForResidential())
      }
    })
  }

  /**
   * Handler for `venue.wme` event
   * @param {jQuery.Event} event
   * @param {HTMLElement} element
   * @param {Venue} model
   * @return {null|void}
   */
  onVenue(event: any, element: any, model: any) {
    if (!this.canEditVenue(model)) {
      return
    }
    if (element.querySelector('div.wme-ui-panel.address-point-helper')) {
      return
    }
    element.prepend(
      this.panel.html()
    )

    $('button.address-point-helper-A').prop('disabled', !this.validateForPoint())
    $('button.address-point-helper-B').prop('disabled', !this.validateForResidential())
  }

  /**
   * Checks if a POI can be cloned as a point: always true if "CopyPOI" is enabled, otherwise requires a house number.
   */
  validateForPoint() {
    let venue = this.getSelectedVenue()
    if (!venue) return false

    let address = this.getSelectedVenueAddress()
    if (!address?.houseNumber) return false

    if (this.settings.get('noDuplicates')) {
      return !hasDuplicate(address?.houseNumber, address.street?.id, address?.houseNumber, false)
    }
    return true
  }

  validateForResidential() {
    let venue = this.getSelectedVenue()
    if (!venue || venue.isResidential) return false

    let address = this.getSelectedVenueAddress()
    if (!address?.houseNumber) return false

    return !hasDuplicate(address?.houseNumber, address.street?.id, address?.houseNumber, true)
  }

  getPointLockRank() {
    let selectedLandmark = this.getSelectedVenue()
    let parentFeatureLockRank = selectedLandmark.lockRank
    let userRank = this.wmeSDK.State.getUserInfo().rank

    if (userRank >= parentFeatureLockRank) {
      return parentFeatureLockRank
    } else if (userRank >= 1) {
      return 1
    } else {
      return 0
    }
  }
}
