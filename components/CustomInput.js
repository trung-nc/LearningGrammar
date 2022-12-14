import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

const CustomInput = ({value, setValue, placeholder, secureTextEntry}) => {
  return (
    <View style={styles.container}>
      <TextInput
        value={value}
        onChangeText={setValue}
        placeholder={placeholder}
        style ={styles.input}
        secureTextEntry={secureTextEntry}
        placeholderTextColor="#202020" 
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    width: '100%',

    borderColor: '#e8e8e8',
    borderWidth: 1,
    borderRadius: 25,

    paddingHorizontal: 10,
    marginVertical: 5,
  },
  input: {
    color: 'black',
  },
})

export default CustomInput;