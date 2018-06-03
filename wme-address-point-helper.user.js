// ==UserScript==
// @name           WME Address Point Helper
// @author         Andrei Pavlenko (andpavlenko)
// @version        1.6.1
// @include 	   /^https:\/\/(www|beta)\.waze\.com\/(?!user\/)(.{2,6}\/)?editor.*$/
// @exclude        https://www.waze.com/user/*editor/*
// @exclude        https://www.waze.com/*/user/*editor/*
// @grant          none
// @description    Creates point with same address
// @namespace https://greasyfork.org/users/182795
// @require https://greasyfork.org/scripts/24851-wazewrap/code/WazeWrap.js
// ==/UserScript==

var settings = {
    addMarker: false,
};

(function() {
    setTimeout(init, 1500);
})();

function init() {
    try {
        if (document.getElementById('sidebarContent') !== null && !!WazeWrap) {
            createMutationObserver();
            createScriptTab();
            initSettings();
        } else {
            setTimeout(init, 1000);
            return;
        }
    } catch (err) {
        setTimeout(1000, init);
        return;
    }
}

function createScriptTab() {
    var tab = $('<div id="sidepanel-aph" class="tab-pane">');
    tab.html([
        '<p>WME Address Point Helper 📍</p>',
        '<div><input type="checkbox" id="aph-add-marker"><label for="APH-add-marker">Додавати точку в\'їзду</label></div>'
    ].join(''));

    new WazeWrap.Interface.Tab('APH📍', tab.html());
    var APHAddMarker = $('#aph-add-marker');
    APHAddMarker.change(() => {
        settings.addMarker = APHAddMarker.prop('checked');
        saveSettings();
    });
}

function initSettings() {
    var savedSettings = localStorage.getItem('aph-settings');
    if (savedSettings) {
        settings = JSON.parse(savedSettings);
    }

    setChecked('aph-add-marker', settings.addMarker);
}

function saveSettings() {
    if (localStorage) {
        localStorage.setItem('aph-settings', JSON.stringify(settings));
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
    if ($.find('.aph-btn').length === 0) {
        insertButtonsIfValidSelection();
    }
}

function insertButtonsIfValidSelection() {
    if (!W.selectionManager.hasSelectedFeatures()) return;
    if (W.selectionManager.getSelectedFeatures()[0].model.type !== 'venue') return;
    if (W.selectionManager.getSelectedFeatures().length !== 1) return;
    insertButtons();
}

function insertButtons() {
    var buttons = $('<div>');
    buttons.html([
        '<div class="form-group">',
        '<input type="button" id="aph-create-point" class="aph-btn btn btn-default" value="Створити точку">',
        '<input type="button" id="aph-create-residential" class="aph-btn btn btn-default" value="Створити АТ">',
        '</div>'
    ].join(''));

    $('#landmark-edit-general .address-edit').append(buttons.html());
    $('#aph-create-point').click(createPoint);
    $('#aph-create-residential').click(createResidential);

    var selectedPoiHN = getSelectedLandmarkAddress().attributes.houseNumber;
    if (!selectedPoiHN || !/^\d+$/.test(selectedPoiHN)) {
        $('#aph-create-residential').prop('disabled', true);
    }
}

function createResidential() {
    createPoint();
    setTimeout(() => {
        $('#landmark-edit-general .btn-link.toggle-residential').click();
    }, 80);
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

    W.selectionManager.unselectAll();
    var addedLandmark = new AddLandmarkAction(NewPoint);
    W.model.actionManager.add(addedLandmark);
    W.selectionManager.setSelectedModels([addedLandmark.landmark]);
    W.model.actionManager.add(new UpdateFeatureAddressAction(NewPoint, newAddressAttributes));

    if (settings.addMarker) {
        setTimeout(() => {
            $('#landmark-edit-general .navigation-point-region button.add-button').click();
        }, 40);
    }
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
    lattitude += Math.random() * 6 + 2;
    longitude += Math.random() * 6 + 2;
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

function setChecked(checkboxId, checked) {
    $('#' + checkboxId).prop('checked', checked);
}