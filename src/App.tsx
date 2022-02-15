/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {openDbAsync, executeSqlAsync, enableDbPromise} from './utils/dbManager';
import React, {useEffect} from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

function ScreenB() {
  return (
    <View>
      <Text>Prova b</Text>
    </View>
  );
}

function ScreenA() {
  return (
    <View>
      <Text>Prova a</Text>
    </View>
  );
}

function Home() {
  const Drawer = createDrawerNavigator();
  return (
    <View style={{flex: 1}}>
      <StatusBar animated={true} />
      <Drawer.Navigator>
        <Drawer.Screen
          name="DataManagement"
          options={{title: 'Dati'}}
          component={ScreenA}
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

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  useEffect(() => {
    enableDbPromise();
    var createTable =
      'CREATE TABLE IF NOT EXISTS [MonthsData]( [Year] SMALLINT, [Month] SMALLINT, [Day] SMALLINT, [Room] SMALLINT, [Value] SMALLINT, PRIMARY KEY([Year] ASC, [Month] ASC, [Room] ASC));';

    openDbAsync('HeatMeters.db').then(async db => {
      var result = await executeSqlAsync(db, createTable);
      console.log('Create table', result);
    });
  }, []);

  const Stack = createNativeStackNavigator();
  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerShown: false,
            headerTitleAlign: 'center',
            headerStyle: {
              backgroundColor: '#0080ff',
            },
          }}>
          {/* <Stack.Screen name="InsertData" component={InsertMonthData} /> */}
          <Stack.Screen name="Home" component={Home} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;