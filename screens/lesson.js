import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import SQLite from 'react-native-sqlite-storage';
import { WebView } from 'react-native-webview';
import Header from '../components/Header';

const LessonScreen = ({ navigation, route }) => {
  const [lessonContent, setContent] = useState([]);

  const { lesson } = route.params;

  useEffect(() => {
    const db = SQLite.openDatabase({
      name: 'grammar_v9',
      createFromLocation : "~grammar_v9.db"
    }, () => {
      console.log('db connection success');
    }, () => {
      console.log('db connection error');
    });

    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM lesson_content WHERE lesson_id = ?", 
        [lesson.id],
        (tx, results) => {
          setContent(results.rows.item(0));
        },
        (tx, error) => console.log('Error: ', error), 
      );
    });
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <Header title={lesson.mean} onPress={() => navigation.goBack()} iconName='chevron-circle-left' />
      <View style={{ flex: 1, padding: 20 }}>
        <WebView
          source={{ html: lessonContent.content }}
          style={{ backgroundColor: 'transparent' }}
        />
      </View>
    </View>
  );
};

export default LessonScreen;

