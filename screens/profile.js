import React from "react";
import { StyleSheet, Text, View, Image, ScrollView, useWindowDimensions, ImageBackground } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import CustomButton from '../components/CustomButton';

const Profile = () => {
  const { height } = useWindowDimensions();

  const onSavedCourse = () => {
    console.warn("onSavedCourse");
  }

  const onAchievements = () => {
    console.warn("onAchievements");
  }

  const onAboutUs = () => {
    console.warn("onAboutUs");
  }

  const onSignOut = () => {
    console.warn("onSignOut");
  }

  return (
      <ImageBackground
        source={require('../Image/Home.png')}
        style={{
            flex: 1,
            justifyContent: "center"
        }}
        resizeMode={'cover'}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.root}>
            <View style={[styles.profileImage, {marginTop: 20}]}>
              <Image 
                source={require("../Image/avatar.png")}
                style={[styles.logo, { height: height * 0.3}]}
                resizeMode="contain"
              />
            </View>
          
            <View style={styles.infoContainer}>
              <Text style={{ color: "black", fontWeight: "200", fontSize: 36 }}>Johny English</Text>
              <Text style={{ color: "black", fontSize: 14, alignSelf: "center" }}>username</Text>
            </View>
            

            <View style={[styles.infoContainer, {marginTop: 22}]}>
              <Text style={{ color: "black", fontSize: 14, fontWeight: "bold", }}>GENERAL</Text>
            </View>

            <CustomButton 
              text="Saved courses"
              onPress={onSavedCourse}
              // type="TERTIARY"
            />

            <CustomButton 
              text="My Achivements"
              onPress={onAchievements}
              // type="TERTIARY"
            />

            <View style={styles.infoContainer}>
              <Text style={{ color: "black", fontSize: 14, fontWeight: "bold", }}>SETTING</Text>
            </View>

            <CustomButton 
              text="About us"
              onPress={onAboutUs}
              // type="TERTIARY"
            />

            <CustomButton 
              text="Sign out"
              onPress={onSignOut}
              // type="TERTIARY"
            />            
          </View>
        </ScrollView>
      </ImageBackground>

  );
}

export default Profile;

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    padding: 20,
  },
  profileImage: {
    width: 200,
    height: 200,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden"
  },
  infoContainer: {
    alignSelf: "center",
    marginTop: 16
  },
});
