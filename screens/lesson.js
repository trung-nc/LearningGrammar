import React from 'react';
import { View, Text, Image, Video, ScrollView, StyleSheet, ImageBackground, SafeAreaView } from 'react-native';
import data from '../data/ldata1'

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

const Lesson = () => {
    const lesson = data;
    return (
        <SafeAreaView style={styles.container}>
            <ImageBackground
                source={require('../images/home.png')}
                style={{
                        flex: 1,
                        justifyContent: "center"
                }}
                resizeMode={'cover'}
            >
                <RenderContent lesson={lesson} />
            </ImageBackground>
        </SafeAreaView>
    );
}

export default Lesson;

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
        color: 'black',
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
