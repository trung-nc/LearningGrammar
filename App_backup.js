import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';

import Home from "./screens/home"
import Search from "./screens/search"
import Profile from "./screens/profile"
import SignInScreen from "./screens/login"
import Quiz from "./screens/quiz"
import Lesson from "./screens/lesson"

const Tab = createBottomTabNavigator();

function MyTabs() {
    return (
        <Tab.Navigator
            screenOptions={{ headerShown: false, }}
            tabBarOption={{
                style: {
                    backgroundColor: 'blue',
                }
            }}
        >
            <Tab.Screen name="Quiz" component={Quiz} 
                    options={{
                        tabBarIcon: ({color, focused}) => (
                            <Icon name="at" size={26} color="#52575D"></Icon>
                        )
                    }}
            />

            <Tab.Screen name="Home" component={Home} 
                options={{
                    tabBarIcon: ({color, focused}) => (
                        <Icon name="home" size={26} color="#52575D"></Icon>
                    )
                }}
            />

            <Tab.Screen name="Search" component={Search} 
                options={{
                    tabBarIcon: ({color, focused}) => (
                        <Icon name="search" size={26} color="#52575D"></Icon>
                    )
                }}
            />

            <Tab.Screen name="Profile" component={Profile} 
                options={{
                    tabBarIcon: ({color, focused}) => (
                        <Icon name="user" size={26} color="#52575D"></Icon>
                    )
                }}
            />

        </Tab.Navigator>
    );
}

const Stack = createNativeStackNavigator();

const App = () => {
    return (
        <NavigationContainer>
            <MyTabs/>
        </NavigationContainer>
    );
}

export default App;