// ==UserScript==
// @name           WME Address Point Helper
// @author         Andrei Pavlenko (andpavlenko)
// @version        1.1
// @include 	   /^https:\/\/(www|beta)\.waze\.com\/(?!user\/)(.{2,6}\/)?editor.*$/
// @exclude        https://www.waze.com/user/*editor/*
// @exclude        https://www.waze.com/*/user/*editor/*
// @grant          none
// ==/UserScript==

(function() {
    setTimeout(init, 1500);
})();

function init() {
    try {
        if (window.Waze.selectionManager.events.register !== undefined) {
            Waze.selectionManager.events.register('selectionchanged', null, insertButtonIfValidSelection);
        } else {
            setTimeout(init, 1000);
            return;
        }
    } catch (err) {
        setTimeout(1000, init);
        return;
    }
}

function insertButtonIfValidSelection() {
    if (!Waze.selectionManager.hasSelectedFeatures()) return;
    if (Waze.selectionManager.getSelectedFeatures()[0].model.type !== 'venue') return;
    if (Waze.selectionManager.getSelectedFeatures().length !== 1) return;
    insertButton();
}

function insertButton() {
    const button = document.createElement('button');
    const formGroup = document.createElement('div');
    formGroup.className = 'form-group';
    button.className = 'btn btn-default';
    button.innerText = 'Create point';
    button.addEventListener('click', createPoint);
    $(formGroup).append(button);
    $('#landmark-edit-general > .form-group')[0].after(formGroup);
}

function createPoint() {
    var LandmarkFeature = require('Waze/Feature/Vector/Landmark');
    var AddLandmarkAction = require('Waze/Action/AddLandmark');
    var UpdateFeatureAddressAction = require('Waze/Action/UpdateFeatureAddress');
    var NewPoint = new LandmarkFeature();
    var { lattitude, longitude } = getPointCoordinates();
    var address = getSelectedLandmarkAddress();
    var lockRank = getPointLockRank();

    NewPoint.geometry = new OL.Geometry.Point(longitude, lattitude);
    NewPoint.attributes.categories.push('OTHER');
    NewPoint.attributes.lockRank = lockRank;

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

    Waze.model.actionManager.add(new AddLandmarkAction(NewPoint));
    Waze.model.actionManager.add(new UpdateFeatureAddressAction(NewPoint, newAddressAttributes));
}

// Высчитываем координаты центра выбраного лэндмарка
function getPointCoordinates() {
    const selectedLandmarkGeometry = Waze.selectionManager.getSelectedFeatures()[0].geometry;
    const selectedLandmarkBounds = selectedLandmarkGeometry.bounds;
    const { left, right, top, bottom } = selectedLandmarkBounds;

    var lattitude = (top + bottom) / 2;
    var longitude = (left + right) / 2;

    // Делаем смещение если выбрано точечное пои
    if (/point/i.test(selectedLandmarkGeometry.id)) {
        lattitude += 1.8;
        longitude += 1.8;
    }

    var coordinates = {
        lattitude, longitude
    };

    return coordinates;
}

function getSelectedLandmarkAddress() {
    const selectedLandmark = Waze.selectionManager.getSelectedFeatures()[0];
    const address = selectedLandmark.model.getAddress();
    return address;
}

function getPointLockRank() {
    const selectedLandmark = Waze.selectionManager.getSelectedFeatures()[0];
    const userRank = Waze.loginManager.user.rank;
    const parentFeatureLockRank = selectedLandmark.model.getLockRank();

    if (userRank >= parentFeatureLockRank) {
        return parentFeatureLockRank;
    } else if (userRank >= 1) {
        return 1;
    } else {
        return 0;
    }
}