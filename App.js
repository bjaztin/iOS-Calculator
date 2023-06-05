import { StatusBar } from 'expo-status-bar';
import {React, useState} from 'react';
import { StyleSheet, View, Text, TouchableOpacity} from 'react-native';

export default function App() {

  const [answerValue, setAnswerValue] = useState(0);
  const [readyToReplace, setReadyToReplace] = useState(true);
  const [memoryValue, setMemoryValue] = useState(0);
  const [operatorValue, setOperatorValue] = useState(0);
  const [equation, setEquation] = useState('');

  const handleNumber = (value) => {

    setEquation(equation + value);

    if(readyToReplace) {
      setReadyToReplace(false);
      return value;
    } else {
      return answerValue + value;
    }
   
  };

  const calculateEquals = () => {
    var previous = parseFloat(memoryValue);
    var current = parseFloat(answerValue);
    
    switch (operatorValue) {
      case '+':
        return previous + current;
      case '-':
        return previous - current;
      case 'x':
        return previous * current;
      case '/':
        return previous / current;
      default:
        return current;
    }
  }

  const buttonPressed = (value) => {
    // it is a number
    if (!isNaN(value) || value == '.') {
      console.log("its a number")
      const newAnswerValue = handleNumber(value);
      setAnswerValue(newAnswerValue);
    }
  
    //  if the button is an clear button
    if(value == 'AC')
    {
      console.log("clear button");
      setAnswerValue(0);
      setMemoryValue(0);
      setEquation('');
      setOperatorValue(0);
      setReadyToReplace(true);
    }

    //  if the button is an oprator
    if(value == '+' || value == '-' || value == 'x' || value == '/')
    {
      if(operatorValue != '0')
      {
        const result = calculateEquals();
        setAnswerValue(result);
        setEquation(equation + value);
        setMemoryValue(result);
      }
      else{
        setMemoryValue(answerValue);
        setEquation(equation + value);
      }
      console.log("operator button");
      setReadyToReplace(true);
      setOperatorValue(value);
    }
    //  if the button is an equal 
    else if(value == '=')
    {
      console.log("equal button");
      const result =  calculateEquals();
      setAnswerValue(result);
      setEquation(equation + value + result);
      setMemoryValue('');
      setReadyToReplace(true);
      setOperatorValue(value);
    }
    //  if the button is +/- button
    else if(value == '+/-')
    {
      console.log("positve/negative button");

      let newEquationValue = equation;
      let newAnswerValue = answerValue * -1;
    
      if (equation !== '') {
        newEquationValue = `(${answerValue * -1})`;
      }
      else {
        newEquationValue = result + `${answerValue * -1}`;
      }
    
      setAnswerValue(newAnswerValue);
      setEquation(newEquationValue);
    }
    //  if the button is percentage button
    else if (value == '%')
    {
      console.log("percentage button");

      if (value == '%'){
    
        setAnswerValue(answerValue * 0.01);
        setEquation(equation + '%');
      }
    }  

  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.displayContainer}>
        <Text style={styles.displayText}>{answerValue}</Text>
      </View>
      <View style={styles.displayEquationContainer}>
        <Text style={styles.displayEquationText}>{equation}</Text>

        </View>
       
      <View style={styles.row}>
        <TouchableOpacity onPress={() => buttonPressed('AC')} style={styles.buttonRow1}>
          <Text style={styles.buttonText}>AC</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => buttonPressed('+/-')} style={styles.buttonRow1}>
          <Text style={styles.buttonText}>+/-</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => buttonPressed('%')} style={styles.buttonRow1}>
          <Text style={styles.buttonText}>%</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => buttonPressed('/')} style={[styles.buttonRow1, styles.buttonBlue]}>
          <Text style={[styles.buttonText, styles.buttonTextWhite]}>/</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.row}>
        <TouchableOpacity onPress={() => buttonPressed('7')} style={styles.button}>
          <Text style={[styles.buttonText, styles.buttonTextWhite]}>7</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => buttonPressed('8')}  style={styles.button}>
          <Text style={[styles.buttonText, styles.buttonTextWhite]}>8</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => buttonPressed('9')}  style={styles.button}>
          <Text style={[styles.buttonText, styles.buttonTextWhite]}>9</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => buttonPressed('x')}  style={[styles.button, styles.buttonBlue]}>
          <Text style={[styles.buttonText, styles.buttonTextWhite]}>x</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.row}>
        <TouchableOpacity onPress={() => buttonPressed('4')} style={styles.button}>
          <Text style={[styles.buttonText, styles.buttonTextWhite]}>4</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => buttonPressed('5')} style={styles.button}>
          <Text style={[styles.buttonText, styles.buttonTextWhite]}>5</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => buttonPressed('6')} style={styles.button}>
          <Text style={[styles.buttonText, styles.buttonTextWhite]}>6</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => buttonPressed('-')} style={[styles.button, styles.buttonBlue]}>
          <Text style={[styles.buttonText, styles.buttonTextWhite]}>-</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.row}>
        <TouchableOpacity onPress={() => buttonPressed('1')} style={styles.button}>
          <Text style={[styles.buttonText, styles.buttonTextWhite]}>1</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => buttonPressed('2')} style={styles.button}>
          <Text style={[styles.buttonText, styles.buttonTextWhite]}>2</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => buttonPressed('3')} style={styles.button}>
          <Text style={[styles.buttonText, styles.buttonTextWhite]}>3</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => buttonPressed('+')} style={[styles.button, styles.buttonBlue]}>
          <Text style={[styles.buttonText, styles.buttonTextWhite]}>+</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.row}>
        <TouchableOpacity onPress={() => buttonPressed('0')} style={[styles.button, styles.buttonZero]}>
          <Text style={[styles.buttonText, styles.buttonTextZero]}>0</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => buttonPressed('.')} style={styles.button}>
          <Text style={[styles.buttonText, styles.buttonTextWhite]}>.</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => buttonPressed('=')} style={[styles.button, styles.buttonBlue]}>
          <Text style={[styles.buttonText, styles.buttonTextWhite]}>=</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    paddingHorizontal: 8,
    paddingBottom: 8,
  },
  displayContainer: {
    flex: 8,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    marginBottom: 8,
  },
  displayEquationContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    marginBottom: 16,
  },
  displayEquationText: {
    fontSize: 22,
    color: '#fff',
    marginBottom: 10,
  },
  displayText: {
    fontSize: 68,
    color: '#fff',
  },
  row: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#454545',
    marginHorizontal: 4,
    height: 80,
    borderRadius: 160,
  },
  buttonRow1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#DBDFAA',
    marginHorizontal: 4,
    height: 80,
    borderRadius: 160,
  },
  buttonBlue: {
    backgroundColor: '#829460',
  },
  buttonText: {
    fontSize: 32,
    color: '#000',
  },
  buttonTextSecondary: {
    color: '#888',
  },
  buttonTextWhite: {
    color: '#fff',
  },
  buttonZero: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'left'
  },
  buttonTextZero: {
    textAlign: 'left',
    color: '#fff',
    paddingLeft: 40
  },
  activeButton: {
    backgroundColor: '#829460',
  },
});