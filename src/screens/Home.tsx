import {createDrawerNavigator} from '@react-navigation/drawer';
import React from 'react';
import {StatusBar, StyleSheet, Text, View} from 'react-native';
import DataManagement from './DataManagement';

export default function Home() {
  function ScreenB() {
    return (
      <View>
        <Text>Prova</Text>
      </View>
    );
  }

  const Drawer = createDrawerNavigator();

  return (
    <View style={styles.container}>
      <StatusBar animated={true} />
      <Drawer.Navigator>
        <Drawer.Screen
          name="DataManagement"
          options={{title: 'Dati'}}
          component={DataManagement}
        />
        <Drawer.Screen
          name="Stats"
          options={{title: 'Statistiche'}}
          component={ScreenB}
        />
      </Drawer.Navigator>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
