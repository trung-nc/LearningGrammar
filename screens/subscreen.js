import React, { useState, useEffect } from 'react';
import { Text, View, SafeAreaView, ImageBackground, StyleSheet, ScrollView, TouchableOpacity, FlatList } from "react-native";
import { useNavigation } from '@react-navigation/native';
import SQLite from 'react-native-sqlite-storage';
import Header from '../components/Header';

const SubScreen = ({ navigation, route }) => {
  const [tables, setTables] = useState([]);

  const { bigLesson } = route.params;

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
        "SELECT * FROM lesson WHERE parent_id = ?", 
        [bigLesson.id],
        (tx, results) => {
          const rows = results.rows;
          const data = [];
          for (let i = 0; i < rows.length; i++) {
            data.push(rows.item(i));
          }
          setTables(data);
          // console.log('Data: ', data);
        },
        (tx, error) => console.log('Error: ', error), 
      );
    });
  }, []);

  const renderButton = ({ item, index }) => (
    <TouchableOpacity style={styles.button} onPress={() => handlePress(item)}>
      <Text style = {{fontWeight: 'bold', fontSize: 16, color:'white'}}>{index + 1}. {item.mean}</Text>
    </TouchableOpacity>
  );

  const handlePress = (item) => {
    navigation.navigate('LessonScreen', { lesson: item });
  };

  return (
    <View style={{ flex: 1 }}>
      <Header title={bigLesson.mean} onPress={() => navigation.goBack()} iconName='chevron-circle-left' />
      <FlatList
        data={tables}
        renderItem={renderButton}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
}

export default SubScreen;

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
