# GlowUp

GlowUp is a skincare companion built with Expo and React Native. Browse the skincare catalog, search by product or ingredient, save and compare favourites, take a skin type quiz, and build separate morning and evening routines.

## Run locally in a browser

Install Node.js and npm. Open a terminal in the repository root and run:

```sh
npm ci
npm run web
```

Expo opens the app in your browser. You can also open [http://localhost:8081](http://localhost:8081) or use the address printed in the terminal if Expo selects a different port. Keep the terminal running while you use the app.

The catalog is bundled with the app. Favourites and routines are stored in the current browser. The climate advisor uses sample conditions for Sri Lankan cities.

## Build the web app

```sh
npx expo export --platform web
```

Expo writes the static web build to `dist/`.
