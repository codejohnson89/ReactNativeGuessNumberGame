import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet,TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';


import Card  from '../components/Card';
import Input from '../components/Input';

const StartGameScreen = props => {

    const [enteredValue, setEnteredValue] = useState('');
    const [confirmed, setConfirmState] = useState(false);
    const [selectedNumber, setSelectedNumber] = useState();

    const numberInputHandler = inputText => {
        setEnteredValue(inputText.replace(/[^0-9]/g, ''))
    }

    const resetInputHandler = () => {
        setEnteredValue('');
        setConfirmState(false);
    }

    const confirmInputHandler = () => {
        const chosenNumber = parseInt(enteredValue);

        if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
            Alert.alert('Invalid number!', 'Number has to be between 1 and - 99', [{text: 'Okay', style: 'destructive', onPress: resetInputHandler}])
            return;
        }
        setConfirmState(true);
        setEnteredValue('');
        setSelectedNumber(chosenNumber);
    }

    let confirmedOutPut;
    if (confirmed) {
        confirmedOutPut = <Text>Chosen Number: {selectedNumber}</Text>
    }
    return (
        <TouchableWithoutFeedback onPress={() => {
            Keyboard.dismiss();
        }}>
        <View style={styles.screen}>
            <Text style={styles.title}>Start a New Game</Text>
            <Card style={styles.inputContainer}>
                <Text>Select a Number</Text>
                <Input 
                style={styles.input} 
                blurOnSubmit 
                autoCapitalize='none' 
                autoCorrect={false} 
                keyboardType="number-pad" 
                maxLength={2} 
                onChangeText={numberInputHandler} 
                value={enteredValue} 
                />
                <View style={styles.buttonContainer}>
                    <View style={styles.buttons}><Button color='red'  title="Reset" onPress={resetInputHandler}/></View>
                    <View style={styles.buttons}><Button  color='green' title="Confirm" onPress={confirmInputHandler}/></View>
                </View>
            </Card>
            {confirmedOutPut}
        </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center'
    },
    title: {
        fontSize: 20,
        marginVertical: 10,

    },
    inputContainer: {
        width: 300,
        maxWidth: '80%',
        alignItems: 'center'
    },
    input: {
        width: 50,
        textAlign: 'center'
    },
    buttonContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        paddingHorizontal: 15
    },
    buttons: {
        width: '45%'
    }
});

export default StartGameScreen;