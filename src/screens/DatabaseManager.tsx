import React from 'react';
import {StatusBar, StyleSheet, Text, View} from 'react-native';
import {CustomButton} from '../utils/CustomButton';
import {globalStyles} from '../utils/globals';

export function DatabaseManager() {
  return (
    <View style={{...globalStyles.container, alignItems: 'center'}}>
      <CustomButton
        title="Esporta dati"
        style={{backgroundColor: '#0f0', width: 200}}
        onPressButton={() => {}}
      />
      <CustomButton
        title="Importa dati"
        style={{backgroundColor: '#0f0', width: 200}}
        onPressButton={() => {}}
      />
    </View>
  );
}
