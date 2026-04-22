// ==UserScript==
// @name         WME Address Point Helper
// @name:uk      WME 🇺🇦 Address Point Helper
// @name:ru      WME 🇺🇦 Address Point Helper
// @description  Creates point with an address of the selected venue
// @description:uk Створення точок з адресою обраного POI
// @description:ru Создание точек с адресом выбранного POI
// @version      3.4.1
// @license      MIT License
// @author       Andrei Pavlenko, Anton Shevchuk
// @namespace    https://greasyfork.org/users/160654-waze-ukraine
// @updateURL    https://greasyfork.org/scripts/457556-wme-address-point-helper
// @downloadURL  https://greasyfork.org/scripts/457556-wme-address-point-helper
// @match        https://*.waze.com/editor*
// @match        https://*.waze.com/*/editor*
// @exclude      https://*.waze.com/user/editor*
// @icon         data:image/png;base64,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
// @grant        none
// @require      https://update.greasyfork.org/scripts/389765/1794584/CommonUtils.js
// @require      https://update.greasyfork.org/scripts/450160/1792042/WME-Bootstrap.js
// @require      https://update.greasyfork.org/scripts/450221/1804989/WME-Base.js
// @require      https://update.greasyfork.org/scripts/450320/1796236/WME-UI.js
// @require      https://cdn.jsdelivr.net/npm/@turf/turf@7.2.0/turf.min.js
// ==/UserScript==

(function () {
    'use strict';

    const NAME = 'Address Point Helper';

    const TRANSLATION = {
        'en': {
            title: 'APH\u{1F4CD}',
            description: 'Address Point Helper \u{1F4CD}',
            help: 'Select a venue to see the <strong>Clone to Point</strong> and <strong>Clone to Residential</strong> buttons in the sidebar panel. '
                + 'The script creates an address point or residential place at the venue\'s location with the same address.',
            buttons: {
                createPoint: 'Clone to Point',
                createResidential: 'Clone to Residential',
                drawPoint: 'Draw Point',
                drawArea: 'Draw Area',
                drawNature: 'Draw Nature',
                drawParking: 'Draw Parking',
            },
            settings: {
                title: 'Options',
                addNavigationPoint: 'Add entry point',
                inheritNavigationPoint: 'Inherit parent\'s landmark entry point',
                autoSetHNToName: 'Copy house number into name',
                noDuplicates: 'Do not create duplicates',
            }
        },
        'uk': {
            title: 'APH\u{1F4CD}',
            description: 'Address Point Helper \u{1F4CD}',
            help: 'Оберіть POI, щоб побачити кнопки <strong>Клон до POI</strong> та <strong>Клон до АТ</strong> на панелі. '
                + 'Скрипт створює адресну точку або житловий будинок у місці розташування POI з тією ж адресою.',
            buttons: {
                createPoint: 'Клон до POI',
                createResidential: 'Клон до АТ',
                drawPoint: 'Створити точку',
                drawArea: 'Створити контур',
                drawNature: 'Створити природу',
                drawParking: 'Створити парковку',
            },
            settings: {
                title: 'Налаштування',
                addNavigationPoint: 'Додавати точку в\'їзду',
                inheritNavigationPoint: 'Наслідувати точку в\'їзду від POI',
                autoSetHNToName: 'Копіювати номер будинку в назву',
                noDuplicates: 'Не створювати дублікатів',
            }
        },
        'ru': {
            title: 'APH\u{1F4CD}',
            description: 'Address Point Helper \u{1F4CD}',
            help: 'Выберите POI, чтобы увидеть кнопки <strong>Клон в POI</strong> и <strong>Клон в АТ</strong> на панели. '
                + 'Скрипт создает адресную точку или жилой дом в месте расположения POI с тем же адресом.',
            buttons: {
                createPoint: 'Клон в POI',
                createResidential: 'Клон в АТ',
                drawPoint: 'Создать точку',
                drawArea: 'Создать контур',
                drawNature: 'Создать природу',
                drawParking: 'Создать парковку',
            },
            settings: {
                title: 'Настройки',
                addNavigationPoint: 'Создавать точку въезда',
                inheritNavigationPoint: 'Наследовать точку въезда от POI',
                autoSetHNToName: 'Копировать номер дома в название',
                noDuplicates: 'Не создавать дубликатов',
            }
        }
    };

    // default settings
    const SETTINGS = {
        addNavigationPoint: true,
        inheritNavigationPoint: true,
        autoSetHNToName: true,
        noDuplicates: true,
    };

    let APHInstance;
    function setAPHInstance(instance) {
        APHInstance = instance;
    }
    function createPoint(isResidential = false) {
        console.groupCollapsed('%c' + NAME + ': \u{1F4CD}%c try to create ' + (isResidential ? 'residential ' : '') + 'point', 'color: #0DAD8D; font-weight: bold', 'color: dimgray; font-weight: normal');
        if ((!APHInstance.validateForPoint() && !isResidential)
            || (!APHInstance.validateForResidential() && isResidential)) {
            console.log('Invalid point');
            console.groupEnd();
            return;
        }
        let venue = APHInstance.getSelectedVenue();
        let address = APHInstance.getSelectedVenueAddress();
        let newPoint = turf.centroid(venue.geometry);
        newPoint.geometry.coordinates[0] += 0.00005;
        newPoint.geometry.coordinates[1] += 0.00005;
        let newName = '';
        if (APHInstance.settings.get('autoSetHNToName')) {
            newName = address.houseNumber ?? '';
        }
        if (!newName && isResidential) {
            newName = venue.name ?? '';
        }
        if (!newName && !isResidential) {
            newName = venue.name ? venue.name + ' (copy)' : '';
        }
        let newVenue = {
            name: newName
        };
        let lockRank = APHInstance.getPointLockRank();
        if (lockRank) {
            newVenue.lockRank = lockRank;
        }
        let newAddress = {
            houseNumber: address.houseNumber,
            streetId: address.street.id,
        };
        if (APHInstance.settings.get('noDuplicates')
            && hasDuplicate(newVenue.name, newAddress.streetId, newAddress.houseNumber, isResidential)) {
            console.log('This point already exists.');
            console.groupEnd();
            return;
        }
        let venueId = APHInstance.wmeSDK.DataModel.Venues.addVenue({
            category: 'OTHER',
            geometry: newPoint.geometry
        });
        newVenue.venueId = String(venueId);
        newAddress.venueId = String(venueId);
        APHInstance.wmeSDK.DataModel.Venues.updateVenue(newVenue);
        APHInstance.wmeSDK.DataModel.Venues.updateAddress(newAddress);
        APHInstance.wmeSDK.DataModel.Venues.updateVenueIsResidential({
            venueId: String(venueId),
            isResidential: isResidential,
        });
        if (APHInstance.settings.get('addNavigationPoint')) {
            // the primary entry point is always one and always on the first position
            let newEntryPoint, parentEntryPoint = venue.navigationPoints?.[0];
            if (APHInstance.settings.get('inheritNavigationPoint') && parentEntryPoint) {
                newEntryPoint = turf.point(parentEntryPoint.point.coordinates);
            }
            else {
                newEntryPoint = turf.point(newPoint.geometry.coordinates);
            }
            // create navigation point
            let navigationPoint = {
                isEntry: true,
                isExit: true,
                isPrimary: true,
                name: parentEntryPoint?.name ?? "",
                point: newEntryPoint.geometry
            };
            APHInstance.wmeSDK.DataModel.Venues.replaceNavigationPoints({
                venueId: String(venueId),
                navigationPoints: [navigationPoint]
            });
        }
        APHInstance.wmeSDK.Editing.setSelection({ selection: {
                ids: [String(venueId)],
                objectType: 'venue'
            } });
        console.log('The point was created.');
        console.groupEnd();
    }
    function createResidential() {
        createPoint(true);
    }
    async function drawOtherPoint() {
        const geometry = await APHInstance.wmeSDK.Map.drawPoint();
        const venueId = APHInstance.wmeSDK.DataModel.Venues.addVenue({ category: 'OTHER', geometry });
        APHInstance.wmeSDK.Editing.setSelection({ selection: { ids: [String(venueId)], objectType: 'venue' } });
    }
    async function drawOtherArea() {
        const geometry = await APHInstance.wmeSDK.Map.drawPolygon();
        const venueId = APHInstance.wmeSDK.DataModel.Venues.addVenue({ category: 'OTHER', geometry });
        APHInstance.wmeSDK.Editing.setSelection({ selection: { ids: [String(venueId)], objectType: 'venue' } });
    }
    async function drawNatureArea() {
        const geometry = await APHInstance.wmeSDK.Map.drawPolygon();
        const venueId = APHInstance.wmeSDK.DataModel.Venues.addVenue({ category: 'NATURAL_FEATURES', geometry });
        APHInstance.wmeSDK.Editing.setSelection({ selection: { ids: [String(venueId)], objectType: 'venue' } });
    }
    async function drawParkingArea() {
        const geometry = await APHInstance.wmeSDK.Map.drawPolygon();
        const venueId = APHInstance.wmeSDK.DataModel.Venues.addVenue({ category: 'PARKING_LOT', geometry });
        APHInstance.wmeSDK.Editing.setSelection({ selection: { ids: [String(venueId)], objectType: 'venue' } });
    }
    function hasDuplicate(name, streetId, houseNumber, isResidential) {
        const venues = APHInstance.getAllVenues();
        for (let i = 0; i < venues.length; i++) {
            const venue = venues[i];
            const address = APHInstance.wmeSDK.DataModel.Venues.getAddress({ venueId: venue.id });
            let equalNames = true; // or empty for residential
            if (!isResidential && !!venue.name && !!name) {
                if (venue.name.toLowerCase().trim() !== name.toLowerCase().trim()) {
                    equalNames = false;
                }
            }
            if (equalNames
                && venue.isResidential === isResidential
                && address.street?.id === streetId
                && address.houseNumber === houseNumber) {
                return true;
            }
        }
        return false;
    }

    function getButtons() {
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
        };
    }

    class APH extends WMEBase {
        constructor(name, settings, buttons) {
            super(name, settings);
            this.initTab();
            this.initShortcuts(buttons);
            this.initPanel(buttons);
            this.initHandlers();
        }
        /**
         * Initial UI elements
         */
        initTab() {
            /** @type {WMEUIHelperTab} */
            let tab = this.helper.createTab(WMEUI.t(NAME).title, {
                sidebar: this.wmeSDK.Sidebar,
                image: GM_info.script.icon
            });
            tab.addText('description', WMEUI.t(NAME).description);
            tab.addDiv('help', WMEUI.t(NAME).help);
            // Setup options
            let fieldsetSettings = this.helper.createFieldset(WMEUI.t(NAME).settings.title);
            let checkboxes = {};
            for (let item in this.settings.container) {
                if (this.settings.container.hasOwnProperty(item)
                    && WMEUI.t(NAME).settings[item]) {
                    checkboxes[item] = {
                        title: WMEUI.t(NAME).settings[item],
                        callback: (event) => this.settings.set(item, event.target.checked),
                        checked: this.settings.get(item),
                    };
                }
            }
            fieldsetSettings.addCheckboxes(checkboxes);
            tab.addElement(fieldsetSettings);
            tab.addText('info', '<a href="' + GM_info.scriptUpdateURL + '">' + GM_info.script.name + '</a> ' + GM_info.script.version);
            tab.addText('blue', 'made in');
            tab.addText('yellow', 'Ukraine');
            tab.inject();
        }
        initShortcuts(buttons) {
            for (let btn in buttons) {
                if (buttons.hasOwnProperty(btn)) {
                    let button = buttons[btn];
                    if (button.shortcut) {
                        this.createShortcut(btn, button.description, button.shortcut, button.callback);
                    }
                }
            }
        }
        initPanel(buttons) {
            // Create a panel for POI (only clone buttons, not draw)
            this.panel = this.helper.createPanel(WMEUI.t(NAME).title);
            this.panel.addButtons({ A: buttons.A, B: buttons.B });
        }
        initHandlers() {
            this.wmeSDK.Events.trackDataModelEvents({ dataModelName: "venues" });
            this.wmeSDK.Events.on({
                eventName: "wme-data-model-objects-changed",
                eventHandler: ({ dataModelName, objectIds }) => {
                    $('button.address-point-helper-A').prop('disabled', !this.validateForPoint());
                    $('button.address-point-helper-B').prop('disabled', !this.validateForResidential());
                }
            });
        }
        /**
         * Handler for `venue.wme` event
         * @param {jQuery.Event} event
         * @param {HTMLElement} element
         * @param {Venue} model
         * @return {null|void}
         */
        onVenue(event, element, model) {
            if (!this.canEditVenue(model)) {
                return;
            }
            if (element.querySelector('div.wme-ui-panel.address-point-helper')) {
                return;
            }
            element.prepend(this.panel.html());
            $('button.address-point-helper-A').prop('disabled', !this.validateForPoint());
            $('button.address-point-helper-B').prop('disabled', !this.validateForResidential());
        }
        /**
         * Checks if a POI can be cloned as a point: always true if "CopyPOI" is enabled, otherwise requires a house number.
         */
        validateForPoint() {
            let venue = this.getSelectedVenue();
            if (!venue)
                return false;
            let address = this.getSelectedVenueAddress();
            if (!address?.houseNumber)
                return false;
            if (this.settings.get('noDuplicates')) {
                return !hasDuplicate(address?.houseNumber, address.street?.id, address?.houseNumber, false);
            }
            return true;
        }
        validateForResidential() {
            let venue = this.getSelectedVenue();
            if (!venue || venue.isResidential)
                return false;
            let address = this.getSelectedVenueAddress();
            if (!address?.houseNumber)
                return false;
            return !hasDuplicate(address?.houseNumber, address.street?.id, address?.houseNumber, true);
        }
        getPointLockRank() {
            let selectedLandmark = this.getSelectedVenue();
            let parentFeatureLockRank = selectedLandmark.lockRank;
            let userRank = this.wmeSDK.State.getUserInfo().rank;
            if (userRank >= parentFeatureLockRank) {
                return parentFeatureLockRank;
            }
            else if (userRank >= 1) {
                return 1;
            }
            else {
                return 0;
            }
        }
    }

    var css_248z = "button.waze-btn.address-point-helper {\n  border: 1px solid #ddd;\n  margin-right: 2px;\n  padding: 3px 8px;\n}\n\nbutton.waze-btn.address-point-helper .chip {\n  align-items: center;\n  display: flex;\n  gap: 5px;\n}\n\np.address-point-helper-info {\n  border-top: 1px solid #ccc;\n  color: #777;\n  font-size: x-small;\n  margin-top: 15px;\n  padding-top: 10px;\n  text-align: center;\n}\n\n#sidebar p.address-point-helper-blue {\n  background-color: #0057B8;\n  color: white;\n  height: 32px;\n  text-align: center;\n  line-height: 32px;\n  font-size: 24px;\n  margin: 0;\n}\n\n#sidebar p.address-point-helper-yellow {\n  background-color: #FFDD00;\n  color: black;\n  height: 32px;\n  text-align: center;\n  line-height: 32px;\n  font-size: 24px;\n  margin: 0;\n}\n";

    $(document).on('bootstrap.wme', () => {
        WMEUI.addTranslation(NAME, TRANSLATION);
        WMEUI.addStyle(css_248z);
        let scriptSettings = new Settings(NAME, SETTINGS);
        let instance = new APH(NAME, scriptSettings, getButtons());
        setAPHInstance(instance);
    });

})();
