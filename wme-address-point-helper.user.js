// ==UserScript==
// @name           WME Address Point Helper
// @author         Andrei Pavlenko (andpavlenko)
// @version        1.4.1
// @include 	   /^https:\/\/(www|beta)\.waze\.com\/(?!user\/)(.{2,6}\/)?editor.*$/
// @exclude        https://www.waze.com/user/*editor/*
// @exclude        https://www.waze.com/*/user/*editor/*
// @grant          none
// @description    Creates point with same address
// @namespace https://greasyfork.org/users/182795
// ==/UserScript==

const BUTTON_ID = 'wme-aph-button';

(function() {
    setTimeout(init, 1500);
})();

function init() {
    try {
        if (document.getElementById('sidebarContent') !== null) {
            createMutationObserver();
        } else {
            setTimeout(init, 1000);
            return;
        }
    } catch (err) {
        setTimeout(1000, init);
        return;
    }
}

function createMutationObserver() {
    const target = document.getElementById('sidebarContent');
    const observerConfig = {
        childList: true,
        subtree: true
    };
    const callback = throttle(mutationObserverCallback, 500);
    const observer = new MutationObserver(callback);
    observer.observe(target, observerConfig);
}


function mutationObserverCallback() {
    if (document.getElementById(BUTTON_ID) === null) {
        insertButtonIfValidSelection();
    }
}

function insertButtonIfValidSelection() {
    if (!W.selectionManager.hasSelectedFeatures()) return;
    if (W.selectionManager.getSelectedFeatures()[0].model.type !== 'venue') return;
    if (W.selectionManager.getSelectedFeatures().length !== 1) return;
    insertButton();
}

function insertButton() {
    const button = document.createElement('button');
    const formGroup = document.createElement('div');
    formGroup.className = 'form-group';
    button.className = 'btn btn-default';
    button.innerText = 'Create point';
    button.id = BUTTON_ID;
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

    W.model.actionManager.add(new AddLandmarkAction(NewPoint));
    W.model.actionManager.add(new UpdateFeatureAddressAction(NewPoint, newAddressAttributes));
    W.selectionManager.unselectAll();
}

// Высчитываем координаты центра выбраного лэндмарка
function getPointCoordinates() {
    const selectedLandmarkGeometry = W.selectionManager.getSelectedFeatures()[0].geometry;
    const selectedLandmarkBounds = selectedLandmarkGeometry.bounds;
    const { left, right, top, bottom } = selectedLandmarkBounds;

    var lattitude = (top + bottom) / 2;
    var longitude = (left + right) / 2;
    var coordinates = addRandomOffsetToCoords({ lattitude, longitude });

    return coordinates;
}

function addRandomOffsetToCoords(coords) {
    var { lattitude, longitude } = coords;
    lattitude += Math.random() * 5 + 0.5;
    longitude += Math.random() * 5 + 0.5;
    return { lattitude, longitude };
}

function getSelectedLandmarkAddress() {
    const selectedLandmark = W.selectionManager.getSelectedFeatures()[0];
    const address = selectedLandmark.model.getAddress();
    return address;
}

function getPointLockRank() {
    const selectedLandmark = W.selectionManager.getSelectedFeatures()[0];
    const userRank = W.loginManager.user.rank;
    const parentFeatureLockRank = selectedLandmark.model.getLockRank();

    if (userRank >= parentFeatureLockRank) {
        return parentFeatureLockRank;
    } else if (userRank >= 1) {
        return 1;
    } else {
        return 0;
    }
}

function throttle(func, time) {
    var lastCall = 0;

    return function() {
        var now = Date.now();
        var needThrottle = false;
        if (now - lastCall < time) {
            needThrottle = true;
        }
        lastCall = now;
        if (needThrottle) return;
        func.apply(null, arguments);
    };
}
