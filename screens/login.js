import {React, useState} from 'react';
import {View, Text, Image, StyleSheet, useWindowDimensions, ScrollView} from 'react-native';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';

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

  const onSignInFacebook = () => {
    console.warn("onSignInFacebook");
  }

  const onSignInGoogle = () => {
    console.warn("onSignInGoogle");
  }

  const onSignInApple = () => {
    console.warn("onSignInApple");
  }

  const onSignUpPress = () => {
    console.warn("onSignUpPress");
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.root}>
        <Image 
          source={require("../Image/logo.png")}
          style={[styles.logo, { height: height * 0.3}]}
          resizeMode="contain"
        />

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
          type="TERTIARY"
        />

        <CustomButton
          text="Sign In with Facebook"
          onPress={onSignInFacebook}
          bgColor="#E7EAF4"
          fgColor="#4765A9"
        />
        <CustomButton
          text="Sign In with Google"
          onPress={onSignInGoogle}
          bgColor="#FAE9EA"
          fgColor="#DD4D44"
        />
        <CustomButton 
          text="Sign In with Apple"
          onPress={onSignInApple}
          bgColor="#e3e3e3"
          fgColor="#363636"
        />

        <CustomButton 
          text="Don't have an account? Create one"
          onPress={onSignUpPress}
          type="TERTIARY"
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    padding: 20,
  },
  logo: {
    width: "70%",
    maxWidth: 300,
    maxHeight: 200,
  },

});

export default SignInScreen;