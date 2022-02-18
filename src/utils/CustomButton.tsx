import React from 'react';
import {Pressable, Text, StyleSheet, TouchableOpacityProps} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

export function CustomButton(props) {
  return (
    <Pressable
      onPress={props.onPressButton}
      style={[styles.button, {...props.style}]}>
      <Text style={styles.text}>{props.title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  text: {
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
});
