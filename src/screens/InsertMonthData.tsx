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
import {MonthData, months, rooms} from '../utils/models';
import {DatePicker} from '../utils/datePicker';
import {executeSqlAsync, openDbAsync} from '../utils/dbManager';

export default function InsertMonthData(props: any) {
  const [currentMonth, setCurrentMonth] = useState<MonthData>(
    props.route.params != null
      ? JSON.parse(props.route.params)
      : {
          month: new Date().getMonth(),
          year: new Date().getFullYear(),
          day: new Date().getDate(),
          value: 0,
        },
  );

  const [valori, setValori] = useState<string[]>([]);
  const [isInsert, setInsert] = useState(props.route.params == null);
  const [curDate, setCurDate] = useState<Date>(
    () => new Date(currentMonth.year, currentMonth.month, currentMonth.day),
  );

  useEffect(() => {
    LoadDataFromDB(setValori, currentMonth);
  }, [props.route.params]);

  return (
    <SafeAreaView style={{flex: 1, margin: 10}}>
      <StatusBar animated={true} />
      <View style={{flex: 1}}>
        <DatePicker currentDate={curDate} onPress={e => setCurDate(e)} />
        {inputMonthData(valori, setValori)}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            zIndex: 0,
          }}>
          <Button
            title="Undo"
            onPress={() => {
              props.navigation.navigate('Home');
            }}
          />
          <Button
            title="Save"
            onPress={() => {
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
        <Text key={`t${i}`} style={{width: 150, fontSize: 18}}>
          {v}
        </Text>
        <TextInput
          style={{
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
    var select =
      'SELECT * FROM [MonthsData] WHERE Year = ? AND MONTH = ? ORDER by ROOM';

    let result = await executeSqlAsync(db, select, [
      currentMonth.year,
      currentMonth.month,
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
      var insert =
        'INSERT INTO [MonthsData] (Year, Month, Day, Room, Value) VALUES(?,?,?,?,?)';

      valori.forEach(async (v: String, i: Number, a: string[]) => {
        await executeSqlAsync(db, insert, [
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
      var update =
        'UPDATE [MonthsData] SET Value = ? WHERE Year = ? AND Month = ? AND Room = ?';

      valori.forEach(async (v: String, i: Number, a: string[]) => {
        await executeSqlAsync(db, update, [
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
