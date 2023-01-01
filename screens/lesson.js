import React from 'react';
import { View, Text, Image, Video, ScrollView, StyleSheet, ImageBackground, SafeAreaView } from 'react-native';
import data from '../data/LessonData'

function RenderContent({ lesson }) {
  return (
    <ScrollView showsVerticalScrollIndicator={false} style={{ padding: 20, paddingBottom: 50}}>
      <Text style={styles.title}>{lesson.title}</Text>
      {lesson.content.map((item, index) => {
        if (item.type === 'text') {
          return <Text key={index} style={styles.text}>{item.text}</Text>;
        } else if (item.type === 'image') {
          return <Image key={index} source={item.image} style={styles.image} />;
        }
      })}
    </ScrollView>
  );
}

const LessonScreen = () => {
  const lesson = data;
  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={require('../Image/Home.png')}
        style={{
            flex: 1,
            justifyContent: "center"
        }}A
        resizeMode={'cover'}
      >
        <RenderContent lesson={lesson} />
      </ImageBackground>
    </SafeAreaView>
  );
}

export default LessonScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: 25,
    margin: 10,
    textTransform: 'uppercase',
    fontWeight: 'bold',
    color: "white",
  },
  text: {
    fontSize: 16,
    margin: 10,
  },
  image: {
    width: '100%',
    height: 200,
    margin: 10,
    resizeMode: 'cover',
    borderRadius: 20,
    overflow: 'hidden',
  },
  video: {
    width: '100%',
    height: 200,
    margin: 10,
  },
});
