name: Build Android APK

on:
  push:
    branches: [ main, master ]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout repository
        uses: actions/checkout@v3

      - name: Set up JDK 17
        uses: actions/setup-java@v3
        with:
          distribution: 'temurin'
          java-version: '17'

      - name: Set up Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'

      - name: Install Cordova
        run: npm install -g cordova

      - name: Create Cordova Project and Add Android
        run: |
          cordova create myApp com.bintaleb.almohassil AlMohassil
          cd myApp
          # If repository contains a www folder, copy it
          if [ -d "../www" ]; then
            rm -rf www
            cp -r ../www .
          fi
          cordova platform add android
          cordova build android --debug

      - name: Upload APK
        uses: actions/upload-artifact@v3
        with:
          name: app-debug
          path: myApp/platforms/android/app/build/outputs/apk/debug/app-debug.apk
