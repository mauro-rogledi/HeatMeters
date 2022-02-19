import React, {Dispatch, SetStateAction, useEffect, useState} from 'react';
import {
  View,
  Text,
  Button,
  TextInput,
  StyleSheet,
  DeviceEventEmitter,
  NativeEventEmitter,
  StatusBar,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {MonthData, queries, rooms} from '../utils/models';
import {DatePicker} from '../utils/datePicker';
import {executeSqlAsync, openDbAsync} from '../utils/dbManager';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {CustomButton} from '../utils/CustomButton';
import {globalStyles} from '../utils/globals';

export default function InsertMonthData(props: any) {
  const [currentMonth, setCurrentMonth] = useState<MonthData>(
    props.route.params != null
      ? JSON.parse(props.route.params)
      : {
          Month: new Date().getMonth(),
          Year: new Date().getFullYear(),
          Day: new Date().getDate(),
          Value: 0,
          Room: 0,
        },
  );

  const [valori, setValori] = useState<string[]>([]);
  const [isInsert, setInsert] = useState(props.route.params == null);
  const [curDate, setCurDate] = useState<Date>(
    () => new Date(currentMonth.Year, currentMonth.Month, currentMonth.Day),
  );

  useEffect(() => {
    LoadDataFromDB(setValori, currentMonth);
  }, [props.route.params]);

  return (
    <SafeAreaView style={globalStyles.container}>
      <StatusBar animated={true} />
      <View style={[globalStyles.container, {margin: 10}]}>
        <DatePicker currentDate={curDate} onPress={e => setCurDate(e)} />
        {inputMonthData(valori, setValori)}
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            zIndex: 0,
          }}>
          <CustomButton
            title="Undo"
            style={{backgroundColor: '#f00'}}
            onPressButton={() => {
              props.navigation.navigate('Home');
            }}
          />
          <CustomButton
            title="Save"
            style={{backgroundColor: '#0f0'}}
            onPressButton={() => {
              SaveData(valori, curDate, isInsert);
              props.navigation.navigate('Home', {update: true});
            }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

function inputMonthData(
  valori: string[],
  setValori: Dispatch<SetStateAction<string[]>>,
) {
  return rooms.map((v, i, txt) => {
    return (
      <View
        key={`{v${i}}`}
        style={{flexDirection: 'row', alignItems: 'center'}}>
        <Text key={`t${i}`} style={{width: 150, fontSize: 18, color: '#fff'}}>
          {v}
        </Text>
        <TextInput
          style={{
            color: '#fff',
            fontSize: 18,
            marginLeft: 30,
            textAlign: 'right',
            width: 150,
          }}
          key={`i${i}`}
          keyboardType="numeric"
          value={valori[i]}
          onChangeText={v => {
            let items = [...valori];
            items[i] = v;
            setValori([...items]);
          }}
        />
      </View>
    );
  });
}

function LoadDataFromDB(
  setValori: Dispatch<SetStateAction<string[]>>,
  currentMonth: MonthData,
) {
  openDbAsync().then(async db => {
    let result = await executeSqlAsync(db, queries.SELECT_MONTH, [
      currentMonth.Year,
      currentMonth.Month,
    ]);

    if (result) {
      let monthsData = result.map<string>((val, index) => val.Value.toString());
      setValori(monthsData);
    }
  });
}
function SaveData(valori: string[], date: Date, isInsert: boolean): void {
  openDbAsync().then(async db => {
    if (isInsert) {
      valori.forEach(async (v: String, i: Number, a: string[]) => {
        await executeSqlAsync(db, queries.INSERT_MONTH, [
          date.getFullYear(),
          date.getMonth(),
          date.getDate(),
          i,
          +v,
        ]);
        if (i == a.length - 1) {
          const emitter = new NativeEventEmitter();
          console.log('emetto insert');
          emitter.emit('refreshData');
        }
      });
    } else {
      valori.forEach(async (v: String, i: Number, a: string[]) => {
        console.log('UPDATE', queries.UPDATE_MONTH);
        await executeSqlAsync(db, queries.UPDATE_MONTH, [
          +v,
          date.getFullYear(),
          date.getMonth(),
          i,
        ]);
        if (i == a.length - 1) {
          const emitter = new NativeEventEmitter();

          console.log('emetto update');
          emitter.emit('refreshData');
        }
      });
    }
  });
}

const styles = StyleSheet.create({
  safeareaview: {
    color: '#ffffff',
    fontSize: 20,
    margin: 10,
    textAlign: 'center',
  },
  button: {
    width: 120,
    height: 50,
    alignItems: 'center',
    borderRadius: 5,
    margin: 10,
  },
  inputText: {
    color: '#fff',
  },
});
