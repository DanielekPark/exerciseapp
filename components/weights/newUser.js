import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, TextInput } from 'react-native';
import { Stack, Button } from "@react-native-material/core";
import exercises from './exercises';
import Schedule from './Schedule';

export default function NewUser({ calcWeight, exerciseDates }) {
  const [userData, setUserData] = useState({ exercises: exercises, plan: [], days: 0, level: '', category: '', showPlan: false, goals: '' });

  return (
    <View>
      <Text style={styles.title}>Create your workout</Text>
      <View style={styles.btnContainer}>
        <Text style={styles.weightsBtn}>
          <Button title="New user" style={styles.btns} />
        </Text>
        <Text style={styles.cardioBtn}>
          <Button title="Returning users" style={styles.btns} />
        </Text>
      </View>

      {/* SHOWS EXERCISES DEPENDING BUTTON PRESSED */}
      <View>
        <Text>Days available for per week for exercise</Text>
        <View style={styles.btnContainer}>
          <Button onPress={() => setUserData({ ...userData, days: 2 })} title="2" />
          <Button onPress={() => setUserData({ ...userData, days: 3 })} title="3" />
        </View>
      </View>

      <View>
        <Text>Choose your level</Text>
        <View style={styles.btnContainer}>
          <Button title="Beginner" onPress={() => setUserData({ ...userData, level: 'beginner' })} />
          <Button title="Intermediate" onPress={() => setUserData({ ...userData, level: 'intermediate' })} />
        </View>
      </View>

      <View>
        <Text>What are your goals?</Text>
        <View style={styles.btnContainer}>
          <Button title="Get bigger" onPress={() => setUserData({ ...userData, goals: 'size' })} />
          <Button title="Stronger" onPress={() => setUserData({ ...userData, goals: 'strength' })} />
        </View>
      </View>

      <Schedule
        userData={userData}
        setUserData={setUserData}
        calcWeight={calcWeight}
        exerciseDates={exerciseDates} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
    marginBottom: 30
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
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginRight: 'auto',
    marginLeft: 'auto',
    marginTop: 30
  },
  cardioBtn: {
    marginRight: 5,
  },
  weightsBtn: {
    marginLeft: 5,
  },
  item: {
    width: Dimensions.get('window').width * 0.5,
    height: 100,
    width: 100,
    borderWidth: 1,
    borderColor: "lightgray",
    alignItems: 'center',
    justifyContent: 'center'
  },
  itemTitle: {
    marginTop: 16,
  },
  selected: {
    backgroundColor: '#98FB98'
  }
});



/* 
EXERCISE ICONS
https://www.gograph.com/vector-clip-art/exercise-stick-figure.html

HIPS: Legs press, dumbbell squat, knee extension
LEGS: Hamstring curl, db deadlift
CHEST: Machine chest press, dips 
BACK: Machine row, pullup machine
SHOULDER: Dumbbell raise, face pull
ABS: Curl up, leg raises, planks
*/

/* 
  acsm pg 350
  nsca pg 390
  beginner 8 - 12 reps, 2-3 sets, 60 - 80%
*/