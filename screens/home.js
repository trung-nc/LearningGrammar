import React, { useState, useEffect } from 'react';
import { Text, View, SafeAreaView, ImageBackground, StyleSheet, ScrollView, TouchableOpacity, FlatList } from "react-native";
import { useNavigation } from '@react-navigation/native';
import SQLite from 'react-native-sqlite-storage';

const Home = ({ navigation }) => {
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

  const renderButton = ({ item, index }) => (
    <TouchableOpacity style={styles.button} onPress={() => handlePress(item)}>
      <Text style = {{fontWeight: 'bold', fontSize: 16, color:'white'}}>{index + 1}. {item.mean}</Text>
    </TouchableOpacity>
  );

  const handlePress = (item) => {
    if (item.is_parent == 1) {
      navigation.navigate('SubScreen', { bigLesson: item });
    } else {
      navigation.navigate('LessonScreen', { lesson: item });
    }
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <ImageBackground
        source={require('../images/home.png')}
        style={{
          paddingBottom: 20
        }}
        resizeMode={'cover'}
      >
        <View style={{paddingBottom: 482}}>
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
              color:"#FFF",
              width: 310,
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
                fontSize:20,
                fontFamily:"Bold",
                paddingRight:100,
              }}>
                Danh sách bài học
              </Text>

            </View>
          </View>

          <FlatList
            data={tables}
            renderItem={renderButton}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
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
