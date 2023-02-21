import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, StatusBar, Image, TouchableOpacity, Modal, ImageBackground, ScrollView } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import SQLite from 'react-native-sqlite-storage';
import Header from '../components/Header';

const Quiz = ({ navigation, route }) => {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentOptionSelected, setCurrentOptionSelected] = useState(null);
  const [correctOption, setCorrectOption] = useState(null);
  const [isOptionDisabled, setIsOptionsDisabled] = useState(false);
  const [score, setScore] = useState(0)
  const [showNextButton, setShowNextButton] = useState(false)
  const [showScoreModal, setShowScoreModal] = useState(false)

  const { level } = route.params;

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
        "SELECT * FROM questions WHERE Level=? ORDER BY RANDOM() LIMIT 30;",
        [level],
        (tx, results) => {
          const rows = results.rows;
          const questions = [];
          for (let i = 0; i < rows.length; i++) {
            questions.push(rows.item(i));
          }
          // console.log('Questions: ', questions);
          setQuestions(questions);
        },
        (tx, error) => console.log('Error: ', error), 
      );
    });
  }, []);
  
  const currentQuestion = questions[currentIndex];

  const options = [currentQuestion?.ExerciseOption1, currentQuestion?.ExerciseOption2, currentQuestion?.ExerciseOption3, currentQuestion?.ExerciseOption4];

  const validateAnswer = (selectedOption) => {
    let correct_option;
    if (currentQuestion) {
      correct_option = currentQuestion.ExerciseAnswer === 1 ? currentQuestion.ExerciseOption1 :
                       currentQuestion.ExerciseAnswer === 2 ? currentQuestion.ExerciseOption2 :
                       currentQuestion.ExerciseAnswer === 3 ? currentQuestion.ExerciseOption3 :
                       currentQuestion.ExerciseAnswer === 4 ? currentQuestion.ExerciseOption4 : null;
    }

    setCurrentOptionSelected(selectedOption);
    setCorrectOption(correct_option);
    setIsOptionsDisabled(true);

    if(selectedOption==correct_option){
      // Set score
      setScore(score+1)
    }
    setShowNextButton(true)
  } 

  const handleNext = () => {
    if (currentIndex == 29) {
      // Last question
      // Show score modal
      setShowScoreModal(true)
    } else {
      setCurrentIndex((prevIndex) => prevIndex + 1);
      setCurrentOptionSelected(null);
      setCorrectOption(null);
      setIsOptionsDisabled(false);
      setShowNextButton(false)
    }
  }

  const renderExplain = () => {
    if (showNextButton) {
      return (
        <View style={{ backgroundColor: '#e0e0e0', padding: 20, borderRadius: 10,}}>
          <Text style={{ color: 'black' }}>EXPLAIN: {currentQuestion?.ExerciseExplanation}</Text>
        </View>
      )
    }else{
      return null
    }
  }

  const renderNextButton = () => {
    if(showNextButton){
      return (
        <TouchableOpacity 
          onPress={handleNext}
          style={{
            marginTop: 20, width: '100%', backgroundColor: "#4169E1", padding: 20, borderRadius: 10
          }}
        >
          <Text style={{fontSize: 20, color:'white', textAlign: 'center'}}>Next</Text>
        </TouchableOpacity>
      )
    }else{
      return null
    }
  }

  const renderQuestion = () => {
    return (  
      <View style={{paddingBottom: 20}}>
        {/*Question Counter*/}
        <View style={{
          flexDirection: 'row',
          alignItems: 'flex-end',
        }}>
          <Text style={{ color:'black', fontSize: 20, opacity: 0.6, marginRight: 2 }}>
            {currentIndex+1}
          </Text>

          <Text style={{ color:'black', fontSize: 18, opacity: 0.6, marginRight: 2 }}>
            / 30
          </Text>
        </View>

        {/*Question*/}
        <Text style = {{ color:'black', fontSize: 26, fontWeight: "bold", paddingBottom: 20 }}>
          {currentQuestion?.ExerciseTask} 
        </Text>
        <Text style = {{ color:'black', fontSize: 24}}>
          {currentQuestion?.ExerciseQuestion} 
        </Text>
      </View>
    )
  }

  const renderOption = () => {
    return (
      <View>
        {options.map((option) => (
          option && (
            <TouchableOpacity
              disabled={isOptionDisabled}
              onPress={() => validateAnswer(option)}
              key={option}
              style={{
                borderWidth: 3,
                borderColor:
                  option === correctOption
                    ? 'green'
                    : option === currentOptionSelected
                    ? 'red'
                    : '#6495ED',
                backgroundColor: '#0096FF',
                height: 50,
                borderRadius: 20,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingHorizontal: 20,
                marginVertical: 10,
              }}>
              <Text style={{ fontSize: 18, color: 'white' }}>{option}</Text>

              {/*Show check or cross icon based on correct answer*/}
              {option === correctOption ? (
                <View
                  style={{
                    width: 30,
                    height: 30,
                    borderRadius: 30 / 2,
                    backgroundColor: 'green',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Icon
                    name="check"
                    style={{
                      color: 'white',
                      fontSize: 20,
                    }}
                  />
                </View>
              ) : option === currentOptionSelected ? (
                <View
                  style={{
                    width: 30,
                    height: 30,
                    borderRadius: 30 / 2,
                    backgroundColor: 'red',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Icon
                    name="close"
                    style={{
                      color: 'white',
                      fontSize: 20,
                    }}
                  />
                </View>
              ) : null}
            </TouchableOpacity>
          )
        ))}
      </View>
    );
  };

  const restartQuiz = () => {
    setShowScoreModal(false);
    setCurrentIndex(0);
    setScore(0);
    setCurrentOptionSelected(null);
    setCorrectOption(null);
    setIsOptionsDisabled(false);
    setShowNextButton(false);
  }

  return (
    <SafeAreaView style={{flex: 1}}>
      <ImageBackground
        source={require('../images/cat.png')}
        style={{flex: 1, justifyContent: "center"}}
        resizeMode={'cover'}
      >
        <ScrollView>
          <Header title={level + ' level'} onPress={() => navigation.goBack()} iconName='times-circle' />
          <View 
            style={{
              flex: 1,
              paddingVertical: 40,
              paddingHorizontal: 16,
              position:'relative'
            }}
          >
            {/*Question */}
            {renderQuestion()}

            {/*Option*/}
            {renderOption(options)}

            {/*Next Button*/}
            {renderExplain()}

            {/*Next Button*/}
            {renderNextButton()}
            
            {/*Score Modal*/}
            <Modal
              animationType="slide"
              transparent={true}
              visible={showScoreModal}
            >
              <View style={{
                flex: 1,
                backgroundColor: '#2ECC71',
                alignItems: 'center',
                justifyContent: 'center'  
              }}>
                <View style={{
                  backgroundColor: 'white',
                  width: '90%',
                  borderRadius: 20,
                  padding: 20,
                  alignItems: 'center'
                }}>
                  <Text style={{fontSize: 30, fontWeight: 'bold', color: 'black'}}>{ score> (30/2) ? 'Congratulations!' : 'Oops!' }</Text>

                  <View style={{
                     flexDirection: 'row',
                     justifyContent: 'flex-start',
                     alignItems: 'center',
                     marginVertical: 20
                  }}>
                    <Text style={{
                        fontSize: 30,
                        color: score> (30/2) ? 'green' : 'red'
                    }}>{score}</Text>
                    <Text style={{
                        fontSize: 20, color: 'black'
                    }}>/ { 30 }</Text>
                  </View>

                  <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={{
                      backgroundColor: '#0096FF',
                      padding: 20, width: '100%', borderRadius: 20
                  }}>
                      <Text style={{
                        textAlign: 'center', color: 'white', fontSize: 20
                      }}>
                        Go back to quiz list
                      </Text>
                  </TouchableOpacity>

                  <View style={{padding: 8}}></View>

                  <TouchableOpacity
                    onPress={restartQuiz}
                    style={{
                       backgroundColor: '#AFE1AF',
                       padding: 20, width: '100%', borderRadius: 20
                    }}>
                        <Text style={{
                            textAlign: 'center', color: 'white', fontSize: 20
                        }}>Retry Quiz</Text>
                  </TouchableOpacity>
            
                </View>
              </View>
            </Modal>
          </View>
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  )
}

export default Quiz;
