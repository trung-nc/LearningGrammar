//<TouchableOpacity disabled={true}>

import { React, useState } from 'react'
import { View, Text, SafeAreaView, StatusBar, Image, TouchableOpacity, Modal, ImageBackground } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import data from '../data/QuizData'

const Quiz = () => {

	const allQuestions = data;
	const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
	const [currentOptionSelected, setCurrentOptionSelected] = useState(null);
	const [correctOption, setCorrectOption] = useState(null);
	const [isOptionDisabled, setIsOptionsDisabled] = useState(false);
	const [score, setScore] = useState(0)
	const [showNextButton, setShowNextButton] = useState(true)
	const [showScoreModal, setShowScoreModal] = useState(false)
   

	const validateAnswer = (selectedOption) => {
		let correct_option = allQuestions[currentQuestionIndex]['correct_option'];
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
		if (currentQuestionIndex == allQuestions.length-1) {
			// Last question
			// Show score modal
			setShowScoreModal(true)
		} else {
			setCurrentQuestionIndex(currentQuestionIndex+1);
			setCurrentOptionSelected(null);
			setCorrectOption(null);
			setIsOptionsDisabled(false);
			setShowNextButton(false)
		}
	}
	const restartQuiz = () => {
		setShowScoreModal(false);

        setCurrentQuestionIndex(0);
        setScore(0);

        setCurrentOptionSelected(null);
        setCorrectOption(null);
        setIsOptionsDisabled(false);
        setShowNextButton(false);
	}


	const renderQuestion = () => {
		return (	
			<View>
				{/*Question Counter*/}
				<View style={{
					flexDirection: 'row',
					alignItems: 'flex-end',
				}}>
					<Text style={{ color:'black', fontSize: 20, opacity: 0.6, marginRight: 2 }}>
						{currentQuestionIndex+1}
					</Text>

					<Text style={{ color:'black', fontSize: 18, opacity: 0.6, marginRight: 2 }}>
						/ {allQuestions.length}
					</Text>
				</View>

				{/*Question*/}
				<Text style = {{
					color:'black',
					fontSize: 30,
				}}> {allQuestions[currentQuestionIndex]?.question} </Text>
			</View>
		)
	}

	const renderOption = () => {
		return (	
			<View>
				{
					allQuestions[currentQuestionIndex]?.options.map(option => (
						<TouchableOpacity
							onPress={()=> validateAnswer(option)}
							key={option}
							style={{
								borderWidth: 3, 
                            	borderColor: option==correctOption
                            	? "green"
                            	: option==currentOptionSelected
                            	? "red"
								: "#6495ED",
	                            backgroundColor: "#0096FF",
	                            height: 60, borderRadius: 20,
	                            flexDirection: 'row',
	                            alignItems: 'center', 
	                            justifyContent: 'space-between',
	                            paddingHorizontal: 20,
	                            marginVertical: 10
							}}
						>
							<Text style={{fontSize: 20, color: 'white' }}>
								{option}
							</Text>

							{/*Show check or cross icon based on correct answer*/}
							{
								option==correctOption ? (
									<View style={{
										width: 30, height: 30, borderRadius: 30/2,
										backgroundColor: "green",
										justifyContent: 'center', alignItems: 'center'
									}}>
										<Icon name="check" style={{
											color: 'white',
											fontSize: 20
										}} />
									</View>
								): option == currentOptionSelected ? (
									<View style={{
										width: 30, height: 30, borderRadius: 30/2,
										backgroundColor: "red",
										justifyContent: 'center', alignItems: 'center'
									}}>
										<Icon name="close" style={{
											color: 'white',
											fontSize: 20
										}} />
									</View>
								): null
							}

						</TouchableOpacity>
					))
				}
			</View>
		)
	}

	const renderNextButton = () => {
		if(showNextButton){
			return (
				<TouchableOpacity 
					onPress={handleNext}
					style={{
						marginTop: 20, width: '100%', backgroundColor: "#4169E1", padding: 20, borderRadius: 5
					}}
				>
					<Text style={{fontSize: 20, color:'white', textAlign: 'center'}}>Next</Text>
				</TouchableOpacity>
			)
		}else{
			return null
		}
	}

	return (
		<SafeAreaView style={{flex: 1}}>
			<ImageBackground
                source={require('../Image/bg.jpg')}
                style={{
                    flex: 1,
	 					justifyContent: "center"
                }}
                resizeMode={'cover'}
            >
				<StatusBar barStyle="light-content"/>
				<View 
					style={{
						flex: 1,
						paddingVertical: 40,
						paddingHorizontal: 16,
						position:'relative'
					}}
				>

					{/*ProgressBar*/}

					{/*Question */}
					{renderQuestion()}

					{/*Option*/}
					{renderOption()}

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
	                           <Text style={{fontSize: 30, fontWeight: 'bold', color: 'black'}}>{ score> (allQuestions.length/2) ? 'Congratulations!' : 'Oops!' }</Text>

	                           <View style={{
	                               flexDirection: 'row',
	                               justifyContent: 'flex-start',
	                               alignItems: 'center',
	                               marginVertical: 20
	                           }}>
	                               	<Text style={{
	                                   	fontSize: 30,
	                                   	color: score> (allQuestions.length/2) ? 'green' : 'red'
	                               	}}>{score}</Text>
	                                <Text style={{
	                                    fontSize: 20, color: 'black'
	                                }}>/ { allQuestions.length }</Text>
	                           	</View>
	                           	{/* Retry Quiz button */}
	                           	<TouchableOpacity
	                           	onPress={restartQuiz}
	                           	style={{
	                               backgroundColor: '#3498DB',
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
			</ImageBackground>
		</SafeAreaView>
	)
}

export default Quiz