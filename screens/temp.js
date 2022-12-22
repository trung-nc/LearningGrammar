import React from "react";
import { Text, View, SafeAreaView, ImageBackground, StyleSheet } from "react-native";


const Home = () => {
    return (
        <SafeAreaView style={{flex: 1}}>
            <ImageBackground
                source={require('../Image/Home.png')}
                style={{
                    flex: 1,
                    justifyContent: "center"
                }}
                resizeMode={'cover'}
            >
                <Text> Hello, World! </Text>
            </ImageBackground>
        </SafeAreaView>
    );
}

export default Home;

const styles = StyleSheet.create({
    
});
