# Property Detection application for the listed objects based on Electron

### How to run

```
npm install --save-dev electron
npm install --save-dev electron-winstaller
npm install electron-packager
npm start
```

### How to package app

```
electron-packager . --platform=win32 --arch=x64
```

### How to create installer

```
node installers/windows/createinstaller.js
```

### How to support linters

```
npm install eslint --save-dev
npm init @eslint/config
npm install --save-dev --save-exact prettier
npm install --save-dev eslint-config-prettier eslint-plugin-prettier
```

add the following lines to `package.json` under scripts section

```
"lint": "eslint .",
"format": "prettier --write ."
```

Use the following commands:

`npm run lint` or `npm run format`
