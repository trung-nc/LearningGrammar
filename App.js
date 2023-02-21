import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';

import Home from "./screens/home"
import Search from "./screens/search"
import Profile from "./screens/profile"
import LoginScreen from "./screens/login"
import Quiz from "./screens/quiz"
import LessonScreen from "./screens/lesson"
import SignupScreen from "./screens/signup"
import SubScreen from './screens/subscreen'
import QuizList from "./screens/quizlist"
import AboutUsScreen from "./screens/aboutus"

import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

function HomeTabs() {
  return (
    <Tab.Navigator
      screenOptions={{ 
        headerShown: false, 
        tabBarActiveTintColor: "green",
        tabBarInactiveTintColor: "black",
        tabBarLabelStyle: {
          fontSize: 12
        },
        tabBarStyle: {
          position: 'absolute',
          display: "flex",
          backgroundColor:'white',
        },
        
      }}
    >
    
      <Tab.Screen name="Home" component={Home} 
        options={{
          tabBarIcon: ({color, focused}) => (
            <Icon name="book" size={26} color="#52575D"></Icon>
          )
        }}
      />

      <Tab.Screen name="QuizList" component={QuizList} 
        options={{
          tabBarIcon: ({color, focused}) => (
            <Icon name="pencil-square-o" size={26} color="#52575D"></Icon>
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

const HomeStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="LoginScreen" component={LoginScreen} /> 
      <Stack.Screen name="SignupScreen" component={SignupScreen} />
      <Stack.Screen name="HomeScreen" component={HomeTabs} options={{title: 'Main'}} />
      <Stack.Screen name="LessonScreen" component={LessonScreen} />  
      <Stack.Screen name="SubScreen" component={SubScreen} /> 
      <Stack.Screen name="Quiz" component={Quiz} /> 
      <Stack.Screen name="AboutUs" component={AboutUsScreen} />
    </Stack.Navigator>  
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <HomeStack/>
    </NavigationContainer>
  );
}

export default App;