// ==UserScript==
// @name           WME Address Point Helper
// @author         Andrei Pavlenko (andpavlenko)
// @version        1.7.0
// @include 	   /^https:\/\/(www|beta)\.waze\.com\/(?!user\/)(.{2,6}\/)?editor.*$/
// @exclude        https://www.waze.com/user/*editor/*
// @exclude        https://www.waze.com/*/user/*editor/*
// @grant          none
// @description    Creates point with same address
// @namespace https://greasyfork.org/users/182795
// @require https://greasyfork.org/scripts/24851-wazewrap/code/WazeWrap.js
// @require https://greasyfork.org/scripts/16071-wme-keyboard-shortcuts/code/WME%20Keyboard%20Shortcuts.js
// ==/UserScript==

var settings = {
    addMarker: false,
};

(function() {
    setTimeout(init, 1000);
})();

function init() {
    try {
        if (
            document.getElementById('sidebarContent') !== null &&
            document.getElementById('user-tabs') !== null && WazeWrap.Ready
        ) {
            createMutationObserver();
            createScriptTab();
            initSettings();
            registerKeyboardShortcuts();
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
    const observer = new MutationObserver(mutationObserverCallback);
    observer.observe(target, observerConfig);
}

function mutationObserverCallback() {
    if (document.querySelector('.aph-btn') === null) {
        insertButtonsIfValidSelection();
    }
}

function insertButtonsIfValidSelection() {
    isValidSelection() && insertButtons();
}

function isValidSelection() {
    if (!W.selectionManager.hasSelectedFeatures()) return false;
    if (W.selectionManager.getSelectedFeatures()[0].model.type !== 'venue') return false;
    if (W.selectionManager.getSelectedFeatures().length !== 1) return false;
    return true;
}

function insertButtons() {
    var buttons = $('<div>');
    buttons.html([
        '<div style="margin-top: 8px">',
        '<div class="btn-toolbar">',
        '<input type="button" id="aph-create-point" class="aph-btn btn btn-default" value="Створити точку">',
        '<input type="button" id="aph-create-residential" class="aph-btn btn btn-default" value="Створити АТ">',
        '</div>',
        '</div>'
    ].join(''));

    $('#landmark-edit-general .address-edit').append(buttons.html());
    $('#aph-create-point').click(createPoint);
    $('#aph-create-residential').click(createResidential);

    if (!selectedPoiHasValidHN()) {
        $('#aph-create-residential').prop('disabled', true);
    }
}

function selectedPoiHasValidHN() {
    try {
        var selectedPoiHN = getSelectedLandmarkAddress().attributes.houseNumber;
        return /^\d+$/.test(selectedPoiHN);
    } catch (e) {
        return false;
    }
}

function createResidential() {
    if (!isValidSelection || !selectedPoiHasValidHN()) return;
    createPoint();
    setTimeout(() => {
        $('#landmark-edit-general .btn-link.toggle-residential').click();
    }, 50);
}

function createPoint() {
    if (!isValidSelection()) return;
    var LandmarkFeature = require('Waze/Feature/Vector/Landmark');
    var AddLandmarkAction = require('Waze/Action/AddLandmark');
    var UpdateFeatureAddressAction = require('Waze/Action/UpdateFeatureAddress');
    var NewPoint = new LandmarkFeature();
    var { lat, lon } = getPointCoordinates();
    var address = getSelectedLandmarkAddress();
    var lockRank = getPointLockRank();

    NewPoint.geometry = new OL.Geometry.Point(lon, lat);
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
        }, 30);
    }
}

// Высчитываем координаты центра выбраного лэндмарка
function getPointCoordinates() {
    const selectedLandmarkGeometry = W.selectionManager.getSelectedFeatures()[0].geometry;

    var coords;
    if (/polygon/i.test(selectedLandmarkGeometry.id)) {
        var polygonCenteroid = selectedLandmarkGeometry.components[0].getCentroid();
        var geometryComponents = selectedLandmarkGeometry.components[0].components;
        var flatComponentsCoords = [];
        geometryComponents.forEach(c => flatComponentsCoords.push(c.x, c.y));
        var centeroid = polygonCenteroid.toLonLat();
        var interiorPoint = getInteriorPointOfArray(
            flatComponentsCoords,
            2, [centeroid.lon, centeroid.lat]
        );

        coords = {
            lon: interiorPoint[0],
            lat: interiorPoint[1]
        };
    } else {
        coords = selectedLandmarkGeometry.toLonLat();
    }

    coords = addRandomOffsetToCoords(coords);
    return coords;
}

function addRandomOffsetToCoords(coords) {
    var { lat, lon } = coords;
    lat += Math.random() * 2 + 1;
    lon += Math.random() * 2 + 1;
    return { lat, lon };
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

function setChecked(checkboxId, checked) {
    $('#' + checkboxId).prop('checked', checked);
}

function registerKeyboardShortcuts() {
    const scriptName = 'AddressPointHelper';

    WMEKSRegisterKeyboardShortcut(scriptName, 'Arrdess Point Helper', 'APHCreatePoint', 'Створити точку', createPoint, '-1');
    WMEKSRegisterKeyboardShortcut(scriptName, 'Arrdess Point Helper', 'APHCreateResidential', 'Створити АТ', createResidential, '-1');

    WMEKSLoadKeyboardShortcuts(scriptName);

    window.addEventListener("beforeunload", function() {
        WMEKSSaveKeyboardShortcuts(scriptName);
    }, false);
}

/*
* https://github.com/openlayers/openlayers
*/
function getInteriorPointOfArray(flatCoordinates, stride, flatCenters) {
    let offset = 0;
    let flatCentersOffset = 0;
    let ends = [flatCoordinates.length];
    let i, ii, x, x1, x2, y1, y2;
    const y = flatCenters[flatCentersOffset + 1];
    const intersections = [];
    // Calculate intersections with the horizontal line
    for (let r = 0, rr = ends.length; r < rr; ++r) {
        const end = ends[r];
        x1 = flatCoordinates[end - stride];
        y1 = flatCoordinates[end - stride + 1];
        for (i = offset; i < end; i += stride) {
            x2 = flatCoordinates[i];
            y2 = flatCoordinates[i + 1];
            if ((y <= y1 && y2 <= y) || (y1 <= y && y <= y2)) {
                x = (y - y1) / (y2 - y1) * (x2 - x1) + x1;
                intersections.push(x);
            }
            x1 = x2;
            y1 = y2;
        }
    }
    // Find the longest segment of the horizontal line that has its center point
    // inside the linear ring.
    let pointX = NaN;
    let maxSegmentLength = -Infinity;
    intersections.sort(numberSafeCompareFunction);
    x1 = intersections[0];
    for (i = 1, ii = intersections.length; i < ii; ++i) {
        x2 = intersections[i];
        const segmentLength = Math.abs(x2 - x1);
        if (segmentLength > maxSegmentLength) {
            x = (x1 + x2) / 2;
            if (linearRingsContainsXY(flatCoordinates, offset, ends, stride, x, y)) {
                pointX = x;
                maxSegmentLength = segmentLength;
            }
        }
        x1 = x2;
    }
    if (isNaN(pointX)) {
        // There is no horizontal line that has its center point inside the linear
        // ring.  Use the center of the the linear ring's extent.
        pointX = flatCenters[flatCentersOffset];
    }

    return [pointX, y, maxSegmentLength];
}

function numberSafeCompareFunction(a, b) {
    return a > b ? 1 : a < b ? -1 : 0;
}

function linearRingContainsXY(flatCoordinates, offset, end, stride, x, y) {
    // http://geomalgorithms.com/a03-_inclusion.html
    // Copyright 2000 softSurfer, 2012 Dan Sunday
    // This code may be freely used and modified for any purpose
    // providing that this copyright notice is included with it.
    // SoftSurfer makes no warranty for this code, and cannot be held
    // liable for any real or imagined damage resulting from its use.
    // Users of this code must verify correctness for their application.
    let wn = 0;
    let x1 = flatCoordinates[end - stride];
    let y1 = flatCoordinates[end - stride + 1];
    for (; offset < end; offset += stride) {
      const x2 = flatCoordinates[offset];
      const y2 = flatCoordinates[offset + 1];
      if (y1 <= y) {
        if (y2 > y && ((x2 - x1) * (y - y1)) - ((x - x1) * (y2 - y1)) > 0) {
          wn++;
        }
      } else if (y2 <= y && ((x2 - x1) * (y - y1)) - ((x - x1) * (y2 - y1)) < 0) {
        wn--;
      }
      x1 = x2;
      y1 = y2;
    }
    return wn !== 0;
}

function linearRingsContainsXY(flatCoordinates, offset, ends, stride, x, y) {
    if (ends.length === 0) {
      return false;
    }
    if (!linearRingContainsXY(flatCoordinates, offset, ends[0], stride, x, y)) {
      return false;
    }
    for (let i = 1, ii = ends.length; i < ii; ++i) {
      if (linearRingContainsXY(flatCoordinates, ends[i - 1], ends[i], stride, x, y)) {
        return false;
      }
    }
    return true;
}
/* **************************************** */