import React from 'react';
import {
  PermissionsAndroid,
  StatusBar,
  StyleSheet,
  ToastAndroid,
  Text,
  View,
  NativeEventEmitter,
} from 'react-native';
import {CustomButton} from '../utils/CustomButton';
import {globalStyles} from '../utils/globals';
import * as RNFS from 'react-native-fs';
import {executeSqlAsync, openDbAsync} from '../utils/dbManager';
import {MonthData, queries} from '../utils/models';

const filename: string = 'MonthsData.json';

export function DatabaseManager() {
  return (
    <View style={{...globalStyles.container, alignItems: 'center'}}>
      <CustomButton
        title="Esporta dati"
        style={{backgroundColor: '#0f0', width: 200}}
        onPressButton={async () => exportDataToFS()}
      />
      <CustomButton
        title="Importa dati"
        style={{backgroundColor: '#0f0', width: 200}}
        onPressButton={async () => importDataFromFS()}
      />
    </View>
  );
}
async function exportDataToFS(): Promise<void> {
  openDbAsync().then(async db => {
    let result = (await executeSqlAsync(db, queries.SELECT_ALL)) as MonthData[];
    if (result) {
      console.log(RNFS.DownloadDirectoryPath);

      if (await getPermissions()) {
        RNFS.writeFile(
          RNFS.DownloadDirectoryPath + '/' + filename,
          JSON.stringify(result),
          'utf8',
        )
          .then(success => {
            console.log('FILE WRITTEN!');
            ToastAndroid.show('Esportazione effettuata', ToastAndroid.LONG);
          })
          .catch(err => {
            console.log(err.message);
          });
      }
    }
  });
}

async function importDataFromFS(): Promise<void> {
  openDbAsync().then(async db => {
    await executeSqlAsync(db, queries.DELETE);

    if (await getPermissions()) {
      let result = await RNFS.readFile(
        RNFS.DownloadDirectoryPath + '/' + filename,
        'utf8',
      );
      if (result) {
        var toWrite = JSON.parse(result) as MonthData[];
        console.log('toWrite', toWrite);
        toWrite.forEach(async el => {
          await executeSqlAsync(db, queries.INSERT_MONTH, [
            el.Year,
            el.Month,
            el.Day,
            el.Room,
            el.Value,
          ]);
          ToastAndroid.showWithGravity(
            'Importazione effettuata',
            ToastAndroid.LONG,
            ToastAndroid.CENTER,
          );
          const emitter = new NativeEventEmitter();
          emitter.emit('refreshData');
        });
      }
    }
  });
}

async function getPermissions(): Promise<boolean> {
  let isPermitedExternalStorage = await PermissionsAndroid.check(
    PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
  );

  if (!isPermitedExternalStorage) {
    // Ask for permission
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      {
        title: 'Storage permission needed',
        message: 'Voglio scrivere',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    return granted === PermissionsAndroid.RESULTS.GRANTED;
  }

  return true;
}
