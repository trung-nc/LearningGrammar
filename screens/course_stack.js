import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/FontAwesome';

import Home from "./home"
import Lesson from "./lesson"

const Stack = createNativeStackNavigator();

const Course_stack = () => {
    return (
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Lesson" component={Lesson} />  
        </Stack.Navigator>  
    );
};


export default Course_stack;