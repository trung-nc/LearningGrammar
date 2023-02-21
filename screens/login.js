import {React, useState, useEffect} from 'react';
import {View, Text, Image, StyleSheet, useWindowDimensions, ScrollView, ImageBackground, SafeAreaView} from 'react-native';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import Icon from 'react-native-vector-icons/FontAwesome';
import { openDatabase } from 'react-native-sqlite-storage';
import SQLite from 'react-native-sqlite-storage';


const LoginScreen = ({ navigation }) => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	const { height } = useWindowDimensions();
	
  // useEffect(() => {
  //   setUsername('');
  //   setPassword('');
  // });

	const onSignInPressed = () => {
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
        'SELECT * FROM accounts WHERE username = ?',
        [username],
        (tx, results) => {
          const account = results.rows.item(0);
          if (!password || !username || password.trim() === '' || username.trim() === '') {
            console.warn('Username or password is empty or invalid');
          } else if (account && account.password === password) {
            navigation.navigate('HomeScreen', { username : username });
            console.warn('Sign in successful');
          } else {
            console.warn('Invalid username or password');
          }
        },
        (tx, error) => console.log('Error: ', error)
      );
    });
  };

	const onSignUpPress = () => {
		navigation.navigate('SignupScreen');
		console.log("onSignUpPress");
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
					LOGIN
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

				<CustomButton text="Sign In" onPress={onSignInPressed} />
				
				<CustomButton 
					text="Don't have an account? Create one"
					onPress={onSignUpPress}
					type="TERTIARY"
					bgColor='gray'
					fgColor='white'
				/>
			</ImageBackground>
		</View>
	);
};

const styles = StyleSheet.create({
	root: {
		flex: 1,
	},
});

export default LoginScreen;