import React from "react";
import { Text, View, SafeAreaView, ImageBackground, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { useNavigation } from '@react-navigation/native';

import Lesson from "./lesson"

const Home = () => {

    const navigation = useNavigation();

    const handlePress = () => {
        navigation.navigate('Lesson');
    }

    return (
        <SafeAreaView style={{flex: 1}}>
            <ImageBackground
                source={require('../images/home.png')}
                style={{
                    flex: 1,
                    justifyContent: "center"
                }}
                resizeMode={'cover'}
            >
                <ScrollView>
                    <View style={{
                        width:"100%",
                        alignItems:"flex-end",
                        paddingHorizontal:20
                    }}>
                       
                    </View>
                    <Text style={{
                        paddingHorizontal:20,
                        fontSize:35,
                        paddingTop:40,
                        fontFamily:"Bold",
                        color:"#FFF"
                    }}>
                        Welcome back Guest User
                    </Text>

                    <View style={{
                        flexDirection:"row",
                        backgroundColor:"#FFF2F2",
                        marginTop:15,
                        marginHorizontal:20,
                        borderRadius:20,
                        paddingVertical:30,
                        paddingLeft:30
                    }}>
                        <View>
                            <Text style={{
                                color:"#345c74",
                                fontSize:20,
                                fontFamily:"Bold",
                                width:250,
                                paddingRight:100 
                            }}>
                                Start learning new Staff
                            </Text>

                        </View>
                    </View>

                    <TouchableOpacity style={styles.button} onPress={handlePress}>
                        <Text style={{fontSize: 20, color: 'white' }}> Present simple </Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.button} onPress={handlePress}>
                        <Text style={{fontSize: 20, color: 'white' }}> Present continuous </Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.button} onPress={handlePress}>
                        <Text style={{fontSize: 20, color: 'white' }}> Present perfect </Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.button} onPress={handlePress}>
                        <Text style={{fontSize: 20, color: 'white' }}> Past simple </Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.button} onPress={handlePress}>
                        <Text style={{fontSize: 20, color: 'white' }}> Past continuous </Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.button} onPress={handlePress}>
                        <Text style={{fontSize: 20, color: 'white' }}> Past perfect </Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.button} onPress={handlePress}>
                        <Text style={{fontSize: 20, color: 'white' }}> Future simple </Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.button} onPress={handlePress}>
                        <Text style={{fontSize: 20, color: 'white' }}> Future continuous </Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.button} onPress={handlePress}>
                        <Text style={{fontSize: 20, color: 'white' }}> Future perfect </Text>
                    </TouchableOpacity>
                </ScrollView>
            </ImageBackground>
        </SafeAreaView>
    );
}

export default Home;

const styles = StyleSheet.create({
  button: {
    borderWidth: 3, 
    borderColor: "green",
    backgroundColor: "#0096FF",
    height: 60, borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center', 
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginVertical: 10,
    margin: 20,
  },
});
