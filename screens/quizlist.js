import React, { useState, useEffect } from 'react';
import { Text, View, SafeAreaView, ImageBackground, StyleSheet, ScrollView, TouchableOpacity, FlatList } from "react-native";
import { useNavigation } from '@react-navigation/native';
import SQLite from 'react-native-sqlite-storage';
import Header from '../components/Header';

const QuizList = ({ navigation }) => {
  const [tables, setTables] = useState([]);

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
        "SELECT * FROM lesson WHERE is_parent = 1 OR parent_id = 0",
        [],
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



  return (
    <SafeAreaView style={{flex: 1}}>
      <ImageBackground
        source={require('../images/cat.png')}
        resizeMode={'cover'}
      >
        <View>
          <View style={{
            flex: 1,
            width:"100%",
            alignItems:"flex-end",
            paddingHorizontal: 20,
          }}>
           
          </View>
            <Text style={{
              paddingHorizontal:20,
              fontSize:35,
              paddingTop:40,
              fontFamily:"Bold",
              color:"#FFF",
              width: 310,
              paddingBottom: 20,
            }}>
              Have a good day, My friends
            </Text>

          <View style={{
            flexDirection:"row",
            backgroundColor:"#FFF2F2",
            marginTop:15,
            marginHorizontal:20,
            borderRadius:20,
            paddingVertical:30,
            paddingLeft:30,
          }}>
            <View>
              <Text style={{
                color:"#345c74",
                fontSize:18,
                fontFamily:"Bold",
                paddingRight:100,
              }}>
                Danh sách bài kiểm tra
              </Text>
            </View>
          </View>

          <View style={{paddingTop: 20, paddingBottom: 100,}}>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Quiz', { level: 'Elementary' })}>
              <Text style = {{fontWeight: 'bold', fontSize: 16, color:'white'}}>Elementary level</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Quiz', { level: 'Important Topics' })}>
              <Text style = {{fontWeight: 'bold', fontSize: 16, color:'white'}}>Important Topics level</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Quiz', { level: 'Intermediate' })}>
              <Text style = {{fontWeight: 'bold', fontSize: 16, color:'white'}}>Intermediate level</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Quiz', { level: 'Upper Intermediate' })}>
              <Text style = {{fontWeight: 'bold', fontSize: 16, color:'white'}}>Upper Intermediate level</Text>
            </TouchableOpacity>
          </View>

        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}

export default QuizList;

const styles = StyleSheet.create({
  button: {
    borderWidth: 3, 
    borderColor: "green",
    backgroundColor: "#0096FF",
    height: 60, 
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center', 
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginVertical: 10,
    margin: 20,
  },
});
