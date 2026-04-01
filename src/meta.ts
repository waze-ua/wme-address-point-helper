// ==UserScript==
// @name         WME Address Point Helper
// @name:uk      WME 🇺🇦 Address Point Helper
// @name:ru      WME 🇺🇦 Address Point Helper
// @description  Creates point with an address of the selected venue
// @description:uk Створення точок з адресою обраного POI
// @description:ru Создание точек с адресом выбранного POI
// @version      {{version}}
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
// @require      https://update.greasyfork.org/scripts/389765/1785927/CommonUtils.js
// @require      https://update.greasyfork.org/scripts/450160/1785943/WME-Bootstrap.js
// @require      https://update.greasyfork.org/scripts/450221/1785960/WME-Base.js
// @require      https://update.greasyfork.org/scripts/450320/1785964/WME-UI.js
// @require      https://cdn.jsdelivr.net/npm/@turf/turf@7.2.0/turf.min.js
// ==/UserScript==
