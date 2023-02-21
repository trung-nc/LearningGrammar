import {React, useState} from 'react';
import {View, Text, Image, StyleSheet, useWindowDimensions, ScrollView, ImageBackground, SafeAreaView} from 'react-native';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import Icon from 'react-native-vector-icons/FontAwesome';
import { openDatabase } from 'react-native-sqlite-storage';
import SQLite from 'react-native-sqlite-storage';

const SignupScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
   

  const { height } = useWindowDimensions();
  
  const onSignUpPressed = () => {
    // console.warn("Sign up succes");
    // navigation.navigate('HomeScreen');
    if (!password || !username || password.trim() === '' || username.trim() === '') {
      console.warn('Username or password is empty or invalid');
    } else if (password != confirmPass) {
      console.warn('Wrong confirm password');
    } else {
      const db = SQLite.openDatabase(
        {
          name: 'grammar_v9',
          createFromLocation: '~grammar_v9.db',
        },
        () => console.log('Database connection successful'),
        () => console.log('Database connection error')
      );

      db.transaction(tx => {
        tx.executeSql(
          'INSERT INTO accounts VALUES (?, ?)',
          [username, password],
          (tx, result) => {
            console.warn('Successfully create new account!');
            navigation.navigate('LoginScreen');
          },
          (tx, err) => {
            console.error("Username or password exist");
          }
        );
      });
    }
  }

  return (
    <View style={styles.root}>
      <ImageBackground 
        source={require('../images/chs.png')}
        style={{
          flex: 1,
          justifyContent: "center",
          padding: 30,
        }}
        resizeMode={'cover'}
      >
        <Text 
          style={{textAlign: 'center', color: 'black', fontWeight: 'bold', fontSize: 30, paddingBottom: 30, paddingTop: 50
        }}>
          CREATE AN ACCOUNT
        </Text>
        
        <CustomInput
          placeholder="UserName"
          value={username}
          setValue={setUsername}
        />
        <CustomInput
          placeholder="Password"
          value={password}
          setValue={setPassword}
          secureTextEntry
        />
        <CustomInput
          placeholder="Confirm password"
          value={confirmPass}
          setValue={setConfirmPass}
          secureTextEntry
        />

        <CustomButton text="Register" onPress={onSignUpPressed} />
        <CustomButton text="You had an account? Sign in here" onPress={() => navigation.navigate('LoginScreen')} bgColor='gray'  />



        <Text>By registering, you confirm that you accept our Terms of Use and Privacy Policy</Text>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});

export default SignupScreen;