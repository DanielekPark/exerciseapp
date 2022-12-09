import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, TextInput } from 'react-native';
import { Stack, Button } from "@react-native-material/core";
import exercises from './exercises';
import Schedule from './Schedule';

export default function NewUser({ option, setOption }) {
  const [userData, setUserData] = useState({ exercises: exercises, selected: [], days: 0, level: '', category: '' });

  //USERS SELECT EXERCISES, HIGHLIGHTS WHEN CHOSEN
  const selectedExer = (name) => {
    const selected = userData.selected.map((item) => {
      if (item.name === name) {
        return {
          ...item,
          chosen: !item.chosen
        }
      }
      return { ...item };
    })
    setUserData({ ...userData, exercises: selected })
  }

  // CREATE A FUNCTION THAT EXERCISES based on button pressed
  const chooseExer = (userData) => {
    if (userData.days === 2) {
      if (userData.category === 'upper') {
        const selected = userData.exercises.filter((exer) => {
          if (userData.muscleGroup === 'back') return exer
          if (userData.muscleGroup === 'chest') return exer
        })
        setUserData({ ...userData, selected: [...selected] });
      }

      if (userData.category === 'lower') {
        const selected = userData.exercises.filter((exer) => {
          if (userData.muscleGroup === 'thigh') return exer
          if (userData.muscleGroup === 'hamstring') return exer
        })
        setUserData({ ...userData, selected: [...selected] });
      }
    }
    const removeDuplicates = () => [...new Set(userData.selected)]
    setUserData({ ...userData, selected: removeDuplicates })
  }

  return (
    <View>
      <Text style={styles.title}>Create your workout</Text>
      <View style={styles.btnContainer}>
        <Text style={styles.cardioBtn}>
          <Button title="Returning users" style={styles.btns} />
        </Text>
        <Text style={styles.weightsBtn}>
          <Button title="New user" style={styles.btns} />
        </Text>
      </View>

      <View>
        <Text>Days available for per week for exercise</Text>
        <View style={styles.btnContainer}>
          {/* when clicked show exercises */}
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

      {/* NEEDS AVAIALBLE DAYS & CATEGORY 

      */}
      <Schedule userData={userData} setUserData={setUserData} />

      {/* 
        CREATE A FUNCTION THAT  EXERCISES based on button pressed
        <TouchableOpacity key={item.name} style={[styles.item, item.chosen ? styles.selected : '']} onPress={() => chooseExer(item.name)}>
          <Text style={styles.itemTitle}>
            {item.name}
          </Text>
        </TouchableOpacity> */}

      {/* Tell user to choose 1 exercise per group */}
      {/* if user touches an exercise it becomes true */}
      {/* 2 time per week day#1 chest and back */}
      {/* day#2 legs and core */}
      {/* press enter & show workout */}
      {/* <View style={styles.container}>
        {userData.exercises.map((item) => {
          return (
            <TouchableOpacity key={item.name} style={[styles.item, item.chosen ? styles.selected : '']} onPress={() => selectedExer(item.name)}>
              <Text style={styles.itemTitle}>
                {item.name}
              </Text>
            </TouchableOpacity>
          )
        })}
      </View> */}

      {/* Please choose the exercises that were done previously for either day 1 or 2 */}
      {/* Need input, collect numbers from  */}
      {/* Need data */}
      {/* Please provide data from a previous workout or number received from using the calc button */}
      {/* 
        Workout plan
      SHOW WORKOUT */}
    </View>
  );
}

/* 
EXERCISE ICONS
https://www.gograph.com/vector-clip-art/exercise-stick-figure.html


BEGINNER
SETS 1-2
REPS 8-12
2-3 PER WEEK
INTENSITY 60-80%

HIPS: Legs press, dumbbell squat, knee extension
LEGS: Hamstring curl, db deadlift
CHEST: Machine chest press, dips 
BACK: Machine row, pullup machine
SHOULDER: Dumbbell raise, face pull
ABS: Curl up, leg raises, planks
*/

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
  acsm pg 350
  nsca pg 390
  beginner 8 - 12 reps, 2-3 sets, 60 - 80%
*/