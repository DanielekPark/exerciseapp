import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Form } from 'react-native';
import { Stack, Button } from "@react-native-material/core";

export default function Weights() {
  const [userData, setUserData] = useState({ age: '', intensity: '' });

  const heartRange = [];

  const setDifficulty = (userData) => {
    // cardio 5 - 15 min warmup,
    // Light warm up 57 - 64 % of HR max
    // Moderate intensity warm up 64 - 76 % of HR max

    // formula for intensity(220 - age * 0.4)

    const age = userData.age / 1;

    if (userData.intensity === 'warmup') {
      const effortLevel = (220 - age * 0.39);
      heartRange.push(effortLevel);
    }
    // if (mode === 'warmup') {
    //   const effortLevel = (220 - age * 39);
    //   heartRange.push(effortLevel);
    // }
    // if (mode === 'warmup') {
    //   const effortLevel = (220 - age * 39);
    //   heartRange.push(effortLevel);
    // }
    // if (mode === 'warmup') {
    //   const effortLevel = (220 - age * 39);
    //   heartRange.push(effortLevel);
    // }

    // MODERATE INTENSITY
    // formula for intensity(220 - age * 0.4)
    // formula for intensity(220 - age * 0.6)
    // VIGOROUS INTENSITY
    // formula for intensity(220 - age * 0.6)
    // formula for intensity(220 - age * 0.9)      

    // Levels of cardio intensity
    //   150 min moderate effort(40 - 60 %) 5 days per week
    //   90 min vigorous effort(60 - 90 %) 3 days per week
  }

  //SETS INTENSITY BASED ON AGE AND INTENSITY LEVEL
  const calcLevel = (userData) => {
    if (!userData.age || !userData.intensity) return;

    //check if age is valid no negative numbers or number past 80
    //if condition is not met return
    // convert age hook from string to number type

    //use useRef hook?

  }

  return (
    <View>
      <View>
        {/* DISPLAY HEART RANGE */}
        <Text>
          Recommended heart range
          {/* if HR > 1 DISPLAY HR */}
        </Text>
      </View>
      <Text style={styles.title}>Cardio Training</Text>
      <View style={styles.btnContainer}>
        <Text style={styles.cardioBtn}>
          <Button title="Warm up" style={styles.btns} onPress={() => setUserData({ ...userData, intensity: 'warmup' })} />
        </Text>
        <Text style={styles.weightsBtn}>
          <Button title="Level 1" style={styles.btns} />
        </Text>
        <Text style={styles.calcBtn}>
          <Button title="Level 2" style={styles.btns} />
        </Text>
        <Text style={styles.calcBtn}>
          <Button title="Level 3" style={styles.btns} />
        </Text>
        <Text style={styles.calcBtn}>
          <Button title="Level 4" style={styles.btns} />
        </Text>

      </View>
      <View>
        {/* NEED INPUT FOR AGE */}
        <TextInput
          style={styles.input}
          placeholder="Age"
          keyboardType="numeric"
          onChange={(event) => setUserData({ ...userData, name: event.nativeEvent.text })}
        />
        <View>
          <Text style={styles.calcBtn}>
            <Button title="Enter" style={styles.btns} />
          </Text>
          <Text style={styles.calcBtn}>
            <Button title="Reset" style={styles.btns} />
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  app: {
    marginHorizontal: "auto",
    maxWidth: 500
  },
  logo: {
    height: 80
  },
  header: {
    padding: 20
  },
  title: {
    fontWeight: "bold",
    marginTop: 50,
    fontSize: 24,
    textAlign: "center"
  },
  btns: {
    width: "30%",
  },
  btnContainer: {
    flexDirection: 'row', flexWrap: 'wrap', marginRight: 'auto', marginLeft: 'auto', marginTop: 30
  },
  cardioBtn: {
    marginRight: 5,
  },
  weightsBtn: {
    marginLeft: 5,
  },
  calcBtn: {
    marginLeft: 5,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});


/* 
POSSIBLE HTML THAT MAYBE NEEDED TO PUT IN 
INPUTS FOR 
Effort
Age
Days
Minutes
APP needs to display Heart Rate range
*/
