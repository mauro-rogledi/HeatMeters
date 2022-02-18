import {
  createDrawerNavigator,
  DrawerContent,
  DrawerNavigationOptions,
} from '@react-navigation/drawer';
import React from 'react';
import {StatusBar, StyleSheet, Text, View} from 'react-native';
import {globalStyles} from '../utils/globals';
import {DatabaseManager} from './DatabaseManager';
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
    <View style={globalStyles.container}>
      <StatusBar animated={true} />
      <Drawer.Navigator
        initialRouteName="Dati"
        defaultScreenOptions={{drawerActiveTintColor: 'Green'}}
        screenOptions={{
          drawerStyle: globalStyles.container,
          //{
          //   backgroundColor: '#f00',
          //   flex: 1,
          // },
          // drawerActiveBackgroundColor: '#ff0',
          drawerActiveTintColor: '#fff',
          drawerInactiveTintColor: '#aaa',
        }}>
        <Drawer.Screen
          name="DataManagement"
          options={{...headerOptions, title: 'Inserimento'}}
          component={DataManagement}
        />
        <Drawer.Screen
          name="Stats"
          options={{...headerOptions, title: 'Statistiche'}}
          component={ScreenB}
        />
        <Drawer.Screen
          name="ImportExport"
          options={{...headerOptions, title: 'Dati'}}
          component={DatabaseManager}
        />
      </Drawer.Navigator>
    </View>
  );
}

const headerOptions: DrawerNavigationOptions = {
  headerStyle: {
    backgroundColor: '#0080ff',
  },
  headerTintColor: '#fff', //Set Header text color
  headerTitleStyle: {
    // fontWeight: 'bold', //Set Header text style
  },
};

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
// });
