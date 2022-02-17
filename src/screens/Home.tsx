import {createDrawerNavigator, DrawerContent} from '@react-navigation/drawer';
import React from 'react';
import {StatusBar, StyleSheet, Text, View} from 'react-native';
import {globalStyles} from '../utils/globals';
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
          options={{
            title: 'Dati',
            headerStyle: {
              backgroundColor: '#0080ff',
            },
            headerTintColor: '#fff', //Set Header text color
            headerTitleStyle: {
              fontWeight: 'bold', //Set Header text style
            },
          }}
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

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
// });
