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
import {ListMonthData, MonthData, months, queries} from '../utils/models';

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
            item.Year.toString() + item.Month.toString()
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
          <Text style={{fontSize: 24, color: '#fff'}}>+</Text>
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
        <Text style={styles.text}>{`${months[item.Month]} ${item.Year}`} </Text>
        <Text style={styles.text}>{item.Value}</Text>
      </Pressable>
    </View>
  );
}

function LoadDataFromDB(
  setResult: Dispatch<SetStateAction<ListMonthData | undefined>>,
) {
  console.log('LoadDataFromDB');

  openDbAsync().then(async db => {
    var result = (await executeSqlAsync(db, queries.SELECT)) as ListMonthData;
    console.log('eccomi', result);
    if (result && result[0].Day) {
      console.log('Rileggo');
      setResult(result);
      console.log('monthsData', result);
    }
  });
}

const styles = StyleSheet.create({
  text: {
    color: '#ffffff',
    fontSize: 20,
    textAlign: 'center',
  },
  button: {
    height: 50,
    flexDirection: 'row',
    alignContent: 'center',
    borderRadius: 5,
    alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 10,
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
    backgroundColor: '#00F',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
});
