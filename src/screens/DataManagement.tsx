import React, {Dispatch, SetStateAction, useEffect, useState} from 'react';
import {
  FlatList,
  NativeEventEmitter,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {executeSqlAsync, openDbAsync} from '../utils/dbManager';
import {globalStyles} from '../utils/globals';
import {ListMonthData, MonthData, months} from '../utils/models';

export default function DataManagement(props: any) {
  const [result, setResult] = useState<ListMonthData>();

  useEffect(() => {
    let emitter = new NativeEventEmitter();
    emitter.addListener('refreshData', () => {
      console.log('ricevo');
      LoadDataFromDB(setResult);
    });
  }, []);

  return (
    <View style={globalStyles.container}>
      <View>
        <FlatList
          numColumns={1}
          data={result}
          keyExtractor={(item, index) =>
            item.year.toString() + item.month.toString()
          }
          renderItem={({item}) => {
            return listItem(props, item);
          }}
        />
      </View>
      <View style={{position: 'absolute', bottom: 10, right: 10}}>
        <Pressable
          style={styles.circle}
          onPress={() => {
            props.navigation.navigate('InsertData');
          }}>
          <Text>+</Text>
        </Pressable>
      </View>
    </View>
  );
}

function listItem(props: any, item: MonthData) {
  return (
    <View>
      <Pressable
        style={styles.button}
        onPress={() => {
          props.navigation.navigate('InsertData', JSON.stringify(item));
        }}>
        <Text>{`${months[item.month]} ${item.year}`} </Text>
        <Text>{item.value}</Text>
      </Pressable>
    </View>
  );
}

function LoadDataFromDB(
  setResult: Dispatch<SetStateAction<ListMonthData | undefined>>,
) {
  console.log('LoadDataFromDB');

  openDbAsync().then(async db => {
    var select =
      'SELECT Year, Month, Day, SUM(Value) as Value FROM [MonthsData] GROUP BY Year, Month ORDER BY Year, Month';
    var result = await executeSqlAsync(db, select);
    let monthsData = result.map<MonthData>((val, index) => ({
      month: val.Month,
      year: val.Year,
      value: val.Value,
      day: val.Day,
      room: 0,
    }));
    setResult(monthsData);
    console.log('monthsData', monthsData);
  });
}

const styles = StyleSheet.create({
  text: {
    color: '#ffffff',
    fontSize: 20,
    margin: 10,
    textAlign: 'center',
  },
  button: {
    height: 30,
    flexDirection: 'row',
    backgroundColor: 'green',
    alignContent: 'center',
    borderRadius: 5,
    alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 10,
    margin: 1,
    justifyContent: 'space-between',
  },
  key: {
    position: 'absolute',
    left: 6,
    top: 6,
  },
  circle: {
    position: 'absolute',
    right: 6,
    bottom: 0,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#0f0',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
});
