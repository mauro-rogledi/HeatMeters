import React, { useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import { View, Text, Pressable, StyleSheet } from "react-native";

export interface IDatePickerProps {
  currentDate: Date;
  onPress: (selectedDate: Date) => void;
}

export function DatePicker(props: IDatePickerProps) {
  const [date, setDate] = useState(props.currentDate);
  const [show, setShow] = useState(false);
  return (
    <View>
      <Pressable onPress={() => setShow(true)}>
        <Text style={styles.text}>{date.toLocaleDateString()}</Text>
      </Pressable>

      {show && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={(event, selectedDate) => {
            setDate(selectedDate || date);
            setShow(false);
            props.onPress(selectedDate || date);
          }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
  },
});
