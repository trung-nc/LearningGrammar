import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const Header = ({ title, onPress, iconName }) => {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 16, backgroundColor: '#5DC1F2' }}>
      <TouchableOpacity onPress={onPress} >
        <Icon name={iconName} size={30} color="white"></Icon>
      </TouchableOpacity>
      <Text style={{ fontSize: 18, fontWeight: 'bold', color:'white', width: 260 }}>{title}</Text>

      <View style={{ width: 24 }} />
    </View>
  );
};

export default Header;