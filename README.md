# Property Detection application for the listed objects based on Electron

### Need to support auto-generate of questionaire from Excel/CSV spreadsheet with timing of the answers

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
