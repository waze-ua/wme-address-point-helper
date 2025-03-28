// ==UserScript==
// @name         WME Address Point Helper
// @description  Creates point with same address
// @version      2.5.6
// @license      MIT License
// @author       Andrei Pavlenko, Anton Shevchuk
// @namespace    https://greasyfork.org/ru/users/160654-waze-ukraine
// @updateURL    https://greasyfork.org/ru/scripts/457556-wme-address-point-helper
// @downloadURL  https://greasyfork.org/ru/scripts/457556-wme-address-point-helper
// @match        https://*.waze.com/editor*
// @match        https://*.waze.com/*/editor*
// @exclude      https://*.waze.com/user/editor*
// @icon         data:image/png;base64,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
// @grant        none
// @require      https://update.greasyfork.org/scripts/389765/1090053/CommonUtils.js
// @require      https://update.greasyfork.org/scripts/450160/1218867/WME-Bootstrap.js
// @require      https://update.greasyfork.org/scripts/452563/1218878/WME.js
// @require      https://update.greasyfork.org/scripts/450221/1137043/WME-Base.js
// @require      https://update.greasyfork.org/scripts/450320/1555446/WME-UI.js
// @require      https://update.greasyfork.org/scripts/480123/1281900/WME-EntryPoint.js

// ==/UserScript==

/* jshint esversion: 8 */
/* global require */
/* global GM_info */
/* global $, jQuery */
/* global W, W.model */
/* global I18n */
/* global OpenLayers */
/* global NavigationPoint */
/* global WME, WMEBase, WMEUI, WMEUIHelper */
/* global Container, Settings, SimpleCache, Tools  */

(function () {
  'use strict'

  // Script name, uses as unique index
  const NAME = 'ADDRESS-POINT-HELPER'

  const TRANSLATION = {
    'en': {
      title: 'APH📍',
      description: 'Address Point Helper 📍',
      buttons: {
        createPoint: 'Clone to POI',
        createResidential: 'Clone to AT',
        newPoint: 'Create new point'
      },
      settings: {
        title: 'Options',
        addNavigationPoint: 'Add entry point',
        inheritNavigationPoint: 'Inherit parent\'s landmark entry point',
        autoSetHNToName: 'Copy house number into name',
        noDuplicates: 'Do not create duplicates'
      }
    },
    'uk': {
      title: 'APH📍',
      description: 'Address Point Helper 📍',
      buttons: {
        createPoint: 'Клон до POI',
        createResidential: 'Клон до АТ',
        newPoint: 'Створити нову точку POI'
      },
      settings: {
        title: 'Налаштування',
        addNavigationPoint: 'Додавати точку в\'їзду',
        inheritNavigationPoint: 'Наслідувати точку в\'їзду від POI',
        autoSetHNToName: 'Копіювати номер будинку в назву',
        noDuplicates: 'Не створювати дублікатів'
      }
    },
    'ru': {
      title: 'APH📍',
      description: 'Address Point Helper 📍',
      buttons: {
        createPoint: 'Клон в POI',
        createResidential: 'Клон в АТ',
        newPoint: 'Создать новую точку POI'
      },
      settings: {
        title: 'Настройки',
        addNavigationPoint: 'Создавать точку въезда',
        inheritNavigationPoint: 'Наследовать точку въезда от POI',
        autoSetHNToName: 'Копировать номер дома в название',
        noDuplicates: 'Не создавать дубликатов'
      }
    }
  }

  const STYLE = '.address-point-helper legend { cursor:pointer; font-size: 12px; font-weight: bold; width: auto; text-align: right; border: 0; margin: 0; padding: 0 8px; }' +
    '.address-point-helper fieldset { border: 1px solid #ddd; padding: 4px; }' +
    '.address-point-helper fieldset div.controls label { white-space: normal; }' +
    'button.address-point-helper { border: 1px solid #ddd; margin-right: 2px; }' +
    'p.address-point-helper-info { border-top: 1px solid #ccc; color: #777; font-size: x-small; margin-top: 15px; padding-top: 10px; text-align: center; }'

  WMEUI.addTranslation(NAME, TRANSLATION)
  WMEUI.addStyle(STYLE)

  // Set shortcuts title
  WMEUIShortcut.setGroupTitle(NAME, I18n.t(NAME).description)

  // default settings
  const SETTINGS = {
    addNavigationPoint: false,
    inheritNavigationPoint: false,
    autoSetHNToName: false,
    noDuplicates: false
  }

  const BUTTONS = {
    A: {
      title: '<i class="w-icon w-icon-node"></i> ' + I18n.t(NAME).buttons.createPoint,
      description: I18n.t(NAME).buttons.createPoint,
      shortcut: 'A+G',
      callback: () => createPoint()
    },
    B: {
      title: '<i class="fa fa-map-marker"></i> ' + I18n.t(NAME).buttons.createResidential,
      description: I18n.t(NAME).buttons.createResidential,
      shortcut: 'A+H',
      callback: () => createResidential()
    },
  }

  let scriptSettings = new Settings(NAME, SETTINGS)

  class APH extends WMEBase {
    constructor (name, settings) {
      super(name, settings)

      this.helper = new WMEUIHelper(NAME)

      // Create tab for settings
      this.tab = this.helper.createTab(
        I18n.t(NAME).title,
        {
          icon: 'home'
        }
      )

      // Setup options
      let fieldsetSettings = this.helper.createFieldset(I18n.t(NAME).settings.title)

      for (let item in settings.container) {
        if (settings.container.hasOwnProperty(item)) {
          fieldsetSettings.addCheckbox(
            item,
            I18n.t(NAME).settings[item],
            event => settings.set([item], event.target.checked),
            settings.get(item)
          )
        }
      }
      this.tab.addElement(fieldsetSettings)

      this.tab.addText(
        'info',
        '<a href="' + GM_info.scriptUpdateURL + '">' + GM_info.script.name + '</a> ' + GM_info.script.version
      )

      this.tab.inject()

      // Create a panel for POI
      this.panel = this.helper.createPanel(I18n.t(NAME).title)
      this.panel.addButtons(BUTTONS)

      /* name, desc, group, title, shortcut, callback, scope */
      new WMEUIShortcut(
        this.name + '_new_point',
        I18n.t(NAME).buttons.newPoint,
        this.name,
        I18n.t(NAME).buttons.newPoint,
        '80', // P
        () => $('.toolbar-group-item.other').find('wz-button.point').click()
      ).register()
    }

    /**
     * Handler for `venue.wme` event
     * @param {jQuery.Event} event
     * @param {HTMLElement} element
     * @param {W.model} model
     * @return {null|void}
     */
    onVenue (event, element, model) {
      if (!model.isGeometryEditable()) {
        return
      }
      if (element.querySelector('div.form-group.address-point-helper')) {
        return
      }
      element.prepend(this.panel.html())

      $('button.address-point-helper-A').prop('disabled', !validateForPoint())
      $('button.address-point-helper-B').prop('disabled', !validateForResidential())
    }

    /**
     * Handler for window `beforeunload` event
     * @param {jQuery.Event} event
     * @return {Null}
     */
    onBeforeUnload (event) {
      this.settings.save()
    }
  }

  $(document).on('bootstrap.wme', () => {
    new APH(NAME, scriptSettings)

    // Register handler for changes
    registerEventListeners()
  })

  function createPoint (isResidential = false) {
    console.groupCollapsed(
      '%c' + NAME + ': 📍%c try to create ' + (isResidential ? 'residential ' : '') + 'point',
      'color: #0DAD8D; font-weight: bold',
      'color: dimgray; font-weight: normal'
    )

    if ((!validateForPoint() && !isResidential)
      || (!validateForResidential() && isResidential)) {
      console.log('Invalid point')
      console.groupEnd()
      return
    }

    let WazeFeatureVectorLandmark = require('Waze/Feature/Vector/Landmark')
    let WazeActionAddLandmark = require('Waze/Action/AddLandmark')
    let WazeActionUpdateObject = require('Waze/Action/UpdateObject')
    let WazeActionUpdateFeatureAddress = require('Waze/Action/UpdateFeatureAddress')

    let { lat, lon } = getPointCoordinates()
    let address = getSelectedLandmarkAddress()
    let lockRank = getPointLockRank()

    let pointGeometry = new OpenLayers.Geometry.Point(lon, lat)

    let NewPoint = new WazeFeatureVectorLandmark({
      geoJSONGeometry: W.userscripts.toGeoJSONGeometry(pointGeometry)
    })
    NewPoint.attributes.categories.push('OTHER')
    NewPoint.attributes.lockRank = lockRank
    NewPoint.attributes.residential = isResidential

    if (scriptSettings.get('addNavigationPoint')) {
      let newEntryPoint, parentEntryPoint = WME.getSelectedVenue().getAttributes().entryExitPoints[0]
      if (scriptSettings.get('inheritNavigationPoint') && parentEntryPoint !== undefined) {
        newEntryPoint = new entryPoint().with({primary: true, point: parentEntryPoint.getPoint()})
      } else {
        newEntryPoint = new entryPoint({primary: true, point: W.userscripts.toGeoJSONGeometry(pointGeometry.clone())})
      }
      NewPoint.attributes.entryExitPoints.push(newEntryPoint)
    }

    if (!!address.attributes.houseNumber) {
      NewPoint.attributes.name = address.attributes.houseNumber
      NewPoint.attributes.houseNumber = address.attributes.houseNumber
    }

    let newAddressAttributes = {
      streetName: address.getStreetName(),
      emptyStreet: false,
      stateID: address.getState().getID(),
      countryID: address.getCountry().getID(),
    }

    if (address.getCity().getID() === 55344
    || address.getCityName() === 'поза НП') {
      newAddressAttributes.cityName = ''
      newAddressAttributes.emptyCity = true
    } else {
      newAddressAttributes.cityName = address.getCityName()
      newAddressAttributes.emptyCity = false
    }

    if (scriptSettings.get('noDuplicates') && hasDuplicate(NewPoint, newAddressAttributes, isResidential)) {
      console.log('This point already exists.')
      console.groupEnd()
      return
    }

    W.selectionManager.unselectAll()
    let addedLandmark = new WazeActionAddLandmark(NewPoint)
    W.model.actionManager.add(addedLandmark)
    W.model.actionManager.add(new WazeActionUpdateFeatureAddress(NewPoint, newAddressAttributes))
    if (!!address.attributes.houseNumber) {
      W.model.actionManager.add(new WazeActionUpdateObject(NewPoint, { houseNumber: address.attributes.houseNumber }))
    }
    W.selectionManager.setSelectedModels([addedLandmark.venue])
    console.log('The point was created.')
    console.groupEnd()
  }

  function createResidential () {
    createPoint(true)
  }

  function validateForPoint () {
    if (!WME.getSelectedVenue()) return false
    let selectedPoiHN = getSelectedLandmarkAddress().attributes.houseNumber
    return /\d+/.test(selectedPoiHN)
  }

  function validateForResidential () {
    if (!WME.getSelectedVenue()) return false
    let selectedPoiHN = getSelectedLandmarkAddress().attributes.houseNumber
    return /^\d+[А-ЯЇІЄ]{0,3}$/i.test(selectedPoiHN)
  }

  function getSelectedLandmarkAddress () {
    return WME.getSelectedVenue().getAddress(W.model)
  }

  function getPointLockRank () {
    let selectedLandmark = WME.getSelectedVenue()
    let userRank = W.loginManager.user.attributes.rank
    let parentFeatureLockRank = selectedLandmark.getLockRank()

    if (userRank >= parentFeatureLockRank) {
      return parentFeatureLockRank
    } else if (userRank >= 1) {
      return 1
    } else {
      return 0
    }
  }

  function getPointCoordinates () {
    let selectedLandmark = WME.getSelectedVenue()
    let selectedLandmarkGeometry = selectedLandmark.getOLGeometry()

    let coords
    if (/polygon/i.test(selectedLandmarkGeometry.id)) {
      let polygonCenteroid = selectedLandmarkGeometry.components[0].getCentroid()
      let geometryComponents = selectedLandmarkGeometry.components[0].components
      let flatComponentsCoords = []
      geometryComponents.forEach(c => flatComponentsCoords.push(c.x, c.y))
      let interiorPoint = getInteriorPointOfArray(
        flatComponentsCoords,
        2, [polygonCenteroid.x, polygonCenteroid.y]
      )
      coords = {
        lon: interiorPoint[0],
        lat: interiorPoint[1]
      }
    } else {
      coords = {
        lon: selectedLandmarkGeometry.x,
        lat: selectedLandmarkGeometry.y
      }
    }

    coords.lon += 4 // shift by X
    coords.lat += 5 // shift by Y
    return coords
  }

  function hasDuplicate (poi, addr, isResidential) {
    const venues = W.model.venues.getObjectArray()

    for (let key in venues) {
      if (!venues.hasOwnProperty(key)) continue
      const currentVenue = venues[key]
      const currentAddress = currentVenue.getAddress(W.model)

      let equalNames = true // or empty for residential
      if (!isResidential && !!currentVenue.attributes.name && !!poi.attributes.name) {
        if (currentVenue.attributes.name !== poi.attributes.name) {
          equalNames = false
        }
      }
      if (
        equalNames
        && poi.attributes.houseNumber === currentVenue.attributes.houseNumber
        && poi.attributes.residential === currentVenue.attributes.residential
        && addr.streetName === currentAddress.getStreetName()
        && addr.cityName === currentAddress.getCityName()
        && addr.countryID === currentAddress.getCountry().getID()
      ) {
        return true
      }
    }
    return false
  }

  function registerEventListeners () {
    let WazeActionUpdateObject = require('Waze/Action/UpdateObject')

    W.model.actionManager.events.register('afteraction', null, action => {
      // Задаем номер дома в название, если нужно. Пока не нашел более лаконичного способа определить что
      // произошло именно изменение адреса. Можно тестить регуляркой поле _description, но будут проблемы с
      // нюансами содержания этого поля на разных языках
      if (scriptSettings.get('autoSetHNToName')) {
        try {
          let subAction = action.action.subActions[0]
          let houseNumber = subAction.attributes.houseNumber
          let feature = subAction.feature
          if (feature.attributes.categories.includes('OTHER') && feature.attributes.name === '') {
            W.model.actionManager.add(new WazeActionUpdateObject(feature, { name: houseNumber }))
          }

          $('button.address-point-helper-A').prop('disabled', !validateForPoint())
          $('button.address-point-helper-B').prop('disabled', !validateForResidential())

        } catch (e) { /* Do nothing */ }
      }
    })
  }

  /**
   * @link https://github.com/openlayers/openlayers
   */
  function getInteriorPointOfArray (flatCoordinates, stride, flatCenters) {
    let offset = 0
    let flatCentersOffset = 0
    let ends = [flatCoordinates.length]
    let i, ii, x, x1, x2, y1, y2
    const y = flatCenters[flatCentersOffset + 1]
    const intersections = []
    // Calculate intersections with the horizontal line
    for (let r = 0, rr = ends.length; r < rr; ++r) {
      const end = ends[r]
      x1 = flatCoordinates[end - stride]
      y1 = flatCoordinates[end - stride + 1]
      for (i = offset; i < end; i += stride) {
        x2 = flatCoordinates[i]
        y2 = flatCoordinates[i + 1]
        if ((y <= y1 && y2 <= y) || (y1 <= y && y <= y2)) {
          x = (y - y1) / (y2 - y1) * (x2 - x1) + x1
          intersections.push(x)
        }
        x1 = x2
        y1 = y2
      }
    }
    // Find the longest segment of the horizontal line that has its center point
    // inside the linear ring.
    let pointX = NaN
    let maxSegmentLength = -Infinity
    intersections.sort(numberSafeCompareFunction)
    x1 = intersections[0]
    for (i = 1, ii = intersections.length; i < ii; ++i) {
      x2 = intersections[i]
      const segmentLength = Math.abs(x2 - x1)
      if (segmentLength > maxSegmentLength) {
        x = (x1 + x2) / 2
        if (linearRingsContainsXY(flatCoordinates, offset, ends, stride, x, y)) {
          pointX = x
          maxSegmentLength = segmentLength
        }
      }
      x1 = x2
    }
    if (isNaN(pointX)) {
      // There is no horizontal line that has its center point inside the linear
      // ring.  Use the center of the the linear ring's extent.
      pointX = flatCenters[flatCentersOffset]
    }

    return [pointX, y, maxSegmentLength]
  }

  function numberSafeCompareFunction (a, b) {
    return a > b ? 1 : a < b ? -1 : 0
  }

  function linearRingContainsXY (flatCoordinates, offset, end, stride, x, y) {
    // http://geomalgorithms.com/a03-_inclusion.html
    // Copyright 2000 softSurfer, 2012 Dan Sunday
    // This code may be freely used and modified for any purpose
    // providing that this copyright notice is included with it.
    // SoftSurfer makes no warranty for this code, and cannot be held
    // liable for any real or imagined damage resulting from its use.
    // Users of this code must verify correctness for their application.
    let wn = 0
    let x1 = flatCoordinates[end - stride]
    let y1 = flatCoordinates[end - stride + 1]
    for (; offset < end; offset += stride) {
      const x2 = flatCoordinates[offset]
      const y2 = flatCoordinates[offset + 1]
      if (y1 <= y) {
        if (y2 > y && ((x2 - x1) * (y - y1)) - ((x - x1) * (y2 - y1)) > 0) {
          wn++
        }
      } else if (y2 <= y && ((x2 - x1) * (y - y1)) - ((x - x1) * (y2 - y1)) < 0) {
        wn--
      }
      x1 = x2
      y1 = y2
    }
    return wn !== 0
  }

  function linearRingsContainsXY (flatCoordinates, offset, ends, stride, x, y) {
    if (ends.length === 0) {
      return false
    }
    if (!linearRingContainsXY(flatCoordinates, offset, ends[0], stride, x, y)) {
      return false
    }
    for (let i = 1, ii = ends.length; i < ii; ++i) {
      if (linearRingContainsXY(flatCoordinates, ends[i - 1], ends[i], stride, x, y)) {
        return false
      }
    }
    return true
  }
})()
