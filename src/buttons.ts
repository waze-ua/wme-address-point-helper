import { NAME } from './name'
import { createPoint, createResidential, drawOtherPoint, drawOtherArea, drawNatureArea, drawParkingArea } from './helpers'

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
    C: {
      title: '<span class="chip"><i class="w-icon w-icon-node"></i>' + WMEUI.t(NAME).buttons.drawPoint + '</span>',
      description: WMEUI.t(NAME).buttons.drawPoint,
      shortcut: 'P',
      callback: () => drawOtherPoint()
    },
    D: {
      title: '<span class="chip"><i class="w-icon w-icon-polygon"></i>' + WMEUI.t(NAME).buttons.drawArea + '</span>',
      description: WMEUI.t(NAME).buttons.drawArea,
      shortcut: 'S+L',
      callback: () => drawOtherArea()
    },
    E: {
      title: '<span class="chip"><i class="w-icon w-icon-polygon"></i>' + WMEUI.t(NAME).buttons.drawNature + '</span>',
      description: WMEUI.t(NAME).buttons.drawNature,
      shortcut: 'S+N',
      callback: () => drawNatureArea()
    },
    F: {
      title: '<span class="chip"><i class="w-icon w-icon-polygon"></i>' + WMEUI.t(NAME).buttons.drawParking + '</span>',
      description: WMEUI.t(NAME).buttons.drawParking,
      shortcut: 'S+P',
      callback: () => drawParkingArea()
    },
  }
}
