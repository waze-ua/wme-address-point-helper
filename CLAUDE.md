# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

WME Address Point Helper is a TamperMonkey/GreaseMonkey userscript for Waze Map Editor (WME). It creates address points (POI or Residential) from selected venues, cloning the address and optionally the entry point.

Source is written in TypeScript under `src/`, built with Rollup into a single IIFE at `dist/wme-address-point-helper.user.js`. GreasyFork auto-syncs from the dist output.

## Commands

- **Install:** `npm install`
- **Build:** `npm run build`
- **Watch:** `npm run watch` (rebuild on changes)
- No test or lint steps exist.

## Architecture

```
src/
├── meta.ts          # userscript header (comment block, not TS code)
├── style.css        # plain CSS, imported as string
├── globals.d.ts     # declares WME runtime globals (WMEBase, WMEUI, etc.)
├── translations.ts  # NAME constant, TRANSLATION (en, uk, ru)
├── settings.ts      # SETTINGS defaults (addNavigationPoint, noDuplicates, etc.)
├── aph.ts           # APH class (extends WMEBase) — UI, shortcuts, handlers
├── helpers.ts       # createPoint, createResidential, hasDuplicate functions
└── index.ts         # bootstrap: registers translations/CSS, defines BUTTONS, instantiates APH
```

**Build output:** `dist/wme-address-point-helper.user.js` — IIFE with userscript header prepended as banner. Version is read from `package.json` via `{{version}}` placeholder in `meta.ts`.

**Key external dependencies** (loaded via `@require` in userscript header, not bundled):
- WME-Bootstrap.js, WME-Base.js, WME-UI.js, CommonUtils.js (WME script ecosystem)
- TurfJS v7.2.0 (geospatial operations — centroid, point)

## Key Design Notes

- `BUTTONS` is defined in `index.ts` (not `settings.ts`) because it calls `I18n.t(NAME)` at evaluation time, which requires `WMEUI.addTranslation()` to have run first
- `helpers.ts` holds standalone functions (`createPoint`, `createResidential`, `hasDuplicate`) that reference the APH instance via a `setAPHInstance()` setter called after construction
- GitHub Actions auto-builds `dist/` on push to master

## Coding Conventions

- TypeScript with `strict: false` — minimal type annotations, `any` for WME SDK types
