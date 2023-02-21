import React from "react";
import { StyleSheet, Text, View, Image, ScrollView, useWindowDimensions, ImageBackground } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import CustomButton from '../components/CustomButton';

const Profile = ({ navigation }) => {
  const { height } = useWindowDimensions();

  const onSavedCourse = () => {
    console.warn("onSavedCourse");
  }

  const onAchievements = () => {
    console.warn("onAchievements");
  }

  const onAboutUs = () => {
    navigation.navigate('AboutUs')
    console.log("onAboutUs");
  }

  const onSignOut = () => {
    navigation.navigate('LoginScreen');
    console.log("onSignOut");
  }

  return ( 
    <ScrollView showsVerticalScrollIndicator={false} style={{backgroundColor:'white'}}>
      <View style={styles.root}>
        <View style={{ marginTop: 30 }}>
          <Image 
            source={require("../images/avatar1.jpg")}
            style={[styles.profileImage, { height: height * 0.25, borderColor: 'green', overflow: 'hidden', borderWidth: 3 }]}
            resizeMode="contain"
          />
        </View>
      
        <View style={styles.infoContainer}>
          <Text style={{ color: "black", fontWeight: "200", fontSize: 36 }}>Username</Text>
          <Text style={{ color: "black", fontSize: 14, alignSelf: "center" }}>username</Text>
        </View>
        

        <View style={[styles.infoContainer, {marginTop: 22}]}>
          <Text style={{ color: "black", fontSize: 14, fontWeight: "bold", }}>GENERAL</Text>
        </View>

        <CustomButton 
          text="My Achivements"
          onPress={onAchievements}
          // type="TERTIARY"
        />

        <View style={styles.infoContainer}>
          <Text style={{ color: "black", fontSize: 14, fontWeight: "bold", }}>SETTING</Text>
        </View>

        <CustomButton 
          text="About developer"
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
