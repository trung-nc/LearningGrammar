import React from 'react';
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';
import Header from '../components/Header';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const AboutUsScreen = ({ navigation }) => {
  return (
    <View style={{flex: 1,}}>
      <Header title='About developer' onPress={() => navigation.goBack()} iconName='chevron-circle-left' />
      <View style={styles.container}>
        <Text style={styles.header}>About Us</Text>
        <Image style={{ width: 250, height: 100, resizeMode: 'cover', }} source={require('../images/hust.png')} />
        <Text style={styles.content}>
          We are a team of developers dedicated to creating innovative and high-quality software solutions. Our goal is to help businesses and individuals streamline their operations and achieve their objectives through the use of cutting-edge technology. 
        </Text>
        <Text style={styles.content}>
          With years of experience and a passion for excellence, we are committed to delivering top-notch software development services to our clients. Contact us today to learn more about how we can help you take your business to the next level.
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
    color: 'black',
  },
  content: {
    fontSize: 16,
    marginVertical: 10,
    textAlign: 'center',
    color: 'black',
  },
});

export default AboutUsScreen;