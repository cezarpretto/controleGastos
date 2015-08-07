#!/bin/bash
caminho="/Users/operador/Documents/projetos/mobile/controleGastos/platforms/android/build/outputs/apk"
cordova build --release android &&
rm -fr $caminho/controleGastos.apk &&
jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore $caminho/agenda.keystore $caminho/android-release-unsigned.apk agenda &&
zipalign -v 4 $caminho/android-release-unsigned.apk $caminho/controleGastos.apk
echo "APK pronto para Produção =)"
