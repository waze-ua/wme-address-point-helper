import { NAME } from './name'

let APHInstance: any

export function setAPHInstance(instance: any) {
  APHInstance = instance
}

export function createPoint(isResidential = false) {
  console.groupCollapsed(
    '%c' + NAME + ': \u{1F4CD}%c try to create ' + (isResidential ? 'residential ' : '') + 'point',
    'color: #0DAD8D; font-weight: bold',
    'color: dimgray; font-weight: normal'
  )

  if ((!APHInstance.validateForPoint() && !isResidential)
    || (!APHInstance.validateForResidential() && isResidential)) {
    console.log('Invalid point')
    console.groupEnd()
    return
  }

  let venue = APHInstance.getSelectedVenue()
  let address = APHInstance.getSelectedVenueAddress()

  let newPoint = turf.centroid(venue.geometry)
  newPoint.geometry.coordinates[0] += 0.00005
  newPoint.geometry.coordinates[1] += 0.00005

  let newName = ''
  if (APHInstance.settings.get('autoSetHNToName')) {
    newName = address.houseNumber ?? ''
  }

  if (!newName && isResidential) {
    newName = venue.name ?? ''
  }

  if (!newName && !isResidential) {
    newName = venue.name ? venue.name + ' (copy)' : ''
  }

  let newVenue: any = {
    name: newName
  }

  let lockRank = APHInstance.getPointLockRank()

  if (lockRank) {
    newVenue.lockRank = lockRank
  }

  let newAddress: any = {
    houseNumber: address.houseNumber,
    streetId: address.street.id,
  }

  if (APHInstance.settings.get('noDuplicates')
    && hasDuplicate(newVenue.name, newAddress.streetId, newAddress.houseNumber, isResidential)) {
    console.log('This point already exists.')
    console.groupEnd()
    return
  }

  let venueId = APHInstance.wmeSDK.DataModel.Venues.addVenue(
    {
      category: 'OTHER',
      geometry: newPoint.geometry
    }
  )
  newVenue.venueId = String(venueId)
  newAddress.venueId = String(venueId)

  APHInstance.wmeSDK.DataModel.Venues.updateVenue(newVenue)
  APHInstance.wmeSDK.DataModel.Venues.updateAddress(newAddress)
  APHInstance.wmeSDK.DataModel.Venues.updateVenueIsResidential({
    venueId: String(venueId),
    isResidential: isResidential,
  })

  if (APHInstance.settings.get('addNavigationPoint')) {
    // the primary entry point is always one and always on the first position
    let newEntryPoint, parentEntryPoint = venue.navigationPoints?.[0]
    if (APHInstance.settings.get('inheritNavigationPoint') && parentEntryPoint) {
      newEntryPoint = turf.point(parentEntryPoint.point.coordinates)
    } else {
      newEntryPoint = turf.point(newPoint.geometry.coordinates)
    }

    // create navigation point
    let navigationPoint = {
      isEntry: true,
      isExit: true,
      isPrimary: true,
      name: parentEntryPoint?.name ?? "",
      point: newEntryPoint.geometry
    }

    APHInstance.wmeSDK.DataModel.Venues.replaceNavigationPoints({
      venueId: String(venueId),
      navigationPoints: [navigationPoint]
    })
  }

  APHInstance.wmeSDK.Editing.setSelection({ selection: {
    ids:[ String(venueId) ],
    objectType: 'venue'
  }})

  console.log('The point was created.')
  console.groupEnd()
}

export function createResidential() {
  createPoint(true)
}

export function hasDuplicate(name: any, streetId: any, houseNumber: any, isResidential: boolean) {
  const venues = APHInstance.getAllVenues()

  for (let i = 0; i < venues.length; i++) {
    const venue = venues[i]
    const address = APHInstance.wmeSDK.DataModel.Venues.getAddress({ venueId: venue.id })

    let equalNames = true // or empty for residential
    if (!isResidential && !!venue.name && !!name) {
      if (venue.name.toLowerCase().trim() !== name.toLowerCase().trim()) {
        equalNames = false
      }
    }

    if (
      equalNames
      && venue.isResidential === isResidential
      && address.street?.id === streetId
      && address.houseNumber === houseNumber
    ) {
      return true
    }
  }

  return false
}
