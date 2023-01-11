import {React, useState} from 'react';
import {View, Text, Image, StyleSheet, useWindowDimensions, ScrollView, ImageBackground, SafeAreaView} from 'react-native';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import Icon from 'react-native-vector-icons/FontAwesome';

const SignInScreen = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    

    const { height } = useWindowDimensions();
    
    const onSignInPressed = () => {
        console.warn("Sign in");
    }

    const onForgotPasswordPressed = () => {
        console.warn("onForgotPasswordPressed");
    }

    const onSignUpPress = () => {
        console.warn("onSignUpPress");
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
                    text="Forgot password?"
                    onPress={onForgotPasswordPressed}
                    bgColor="white"
                    type="TERTIARY"
                />

                <CustomButton 
                    text="Don't have an account? Create one"
                    onPress={onSignUpPress}
                    type="TERTIARY"
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

export default SignInScreen;