# WME 🇺🇦 Address Point Helper

A TamperMonkey/GreaseMonkey userscript for Waze Map Editor that creates address points (POI or Residential) from selected venues, cloning the address and optionally the entry point.

![APH Controls](screenshot.png)

![APH Example of usage](screenshot.gif)

## Features

- Clone selected venue to a new Point POI with the same address
- Clone selected venue to a new Residential point
- Auto-detect and copy house number, street, and city
- Optionally copy house number into the point name
- Optionally inherit the entry point from the parent venue
- Duplicate detection — prevents creating points with the same address
- Keyboard shortcuts for quick operation

## Settings

![APH Settings](settings.png)

| Option | Description |
|--------|-------------|
| Add entry point | Create an entry point on the new POI |
| Inherit parent's entry point | Copy the entry point from the source venue |
| Copy house number into name | Set the house number as the point name |
| Do not create duplicates | Skip if a point with the same address already exists |

## Shortcuts

| Shortcut | Description |
|----------|-------------|
| `Alt`+`G` | Clone to Point POI |
| `Alt`+`H` | Clone to Residential |

## Development

```bash
npm install
npm run build       # one-off build → dist/wme-address-point-helper.user.js
npm run watch       # rebuild on changes
```

### Project Structure

Source is written in TypeScript under `src/`, built with Rollup into a single IIFE at `dist/wme-address-point-helper.user.js`.

```
src/
├── meta.ts          # userscript header
├── style.css        # plain CSS
├── globals.d.ts     # WME runtime globals
├── translations.ts  # NAME, TRANSLATION (en, uk, ru)
├── settings.ts      # SETTINGS defaults
├── buttons.ts       # getButtons() — deferred button definitions
├── aph.ts           # APH class (UI, shortcuts, validation)
├── helpers.ts       # createPoint, createResidential, hasDuplicate
└── index.ts         # bootstrap entry point
```

## Links

Script homepage: https://github.com/waze-ua/wme-address-point-helper
GreasyFork: https://greasyfork.org/en/scripts/45339-wme-address-point-helper
