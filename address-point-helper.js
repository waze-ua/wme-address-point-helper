// ==UserScript==
// @name           WME Address Point Helper
// @author         Andrei Pavlenko (andpavlenko)
// @version        1.0
// @include 	   /^https:\/\/(www|beta)\.waze\.com\/(?!user\/)(.{2,6}\/)?editor.*$/
// @exclude        https://www.waze.com/user/*editor/*
// @exclude        https://www.waze.com/*/user/*editor/*
// @grant          none
// ==/UserScript==

(function() {
    setTimeout(init, 1000);
})();

function init() {
    Waze.selectionManager.events.register('selectionchanged', null, () => {
        checkSelection() && insertButton();
    });
}

function checkSelection() {
    const selectedFeatures = Waze.selectionManager._selectedFeatures;

    if (selectedFeatures.length !== 1) {
        return false;
    } else if (selectedFeatures[0].model.type !== 'venue') {
        return false;
    } else {
        return true;
    }
}

function insertButton() {
    const button = document.createElement('button');
    button.className = 'btn btn-default';
    button.innerText = 'Create point';
    button.addEventListener('click', createPoint);
    $('#landmark-edit-general .residential-tooltip').after(button);
}

function createPoint() {
    var LandmarkFeature = require('Waze/Feature/Vector/Landmark');
    var AddLandmarkAction = require('Waze/Action/AddLandmark');
    var UpdateFeatureAddressAction = require('Waze/Action/UpdateFeatureAddress');
    var NewPoint = new LandmarkFeature();
    var { lattitude, longitude } = getPointCoordinates();
    var address = getSelectedLandmarkAddress();

    NewPoint.geometry = new OL.Geometry.Point(longitude, lattitude);
    NewPoint.attributes.categories.push('OTHER');

    if (!!address.attributes.houseNumber) {
        NewPoint.attributes.name = address.attributes.houseNumber;
        NewPoint.attributes.houseNumber = address.attributes.houseNumber;
    }

    var newAddressAttributes = {
        streetName: address.attributes.street.getAttributes().name,
        emptyStreet: false,
        cityName: address.attributes.city.getAttributes().name,
        emptyCity: false,
        stateID: address.attributes.state.getAttributes().id,
        countryID: address.attributes.country.getAttributes().id,
    };

    W.model.actionManager.add(new AddLandmarkAction(NewPoint));
    W.model.actionManager.add(new UpdateFeatureAddressAction(NewPoint, newAddressAttributes));
}

// Высчитываем координаты центра выбраного лэндмарка
function getPointCoordinates() {
    const selectedLandmarkGeometry = Waze.selectionManager._selectedFeatures[0].geometry;
    const selectedLandmarkBounds = selectedLandmarkGeometry.bounds;
    const { left, right, top, bottom } = selectedLandmarkBounds;

    var lattitude = (top + bottom) / 2;
    var longitude = (left + right) / 2;
    var coordinates = {
        lattitude, longitude
    };

    return coordinates;
}

function getSelectedLandmarkAddress() {
    const selectedLandmark = Waze.selectionManager._selectedFeatures[0];
    const address = selectedLandmark.model.getAddress();

    return address;
}