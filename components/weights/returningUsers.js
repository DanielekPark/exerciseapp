import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native';
import { Stack, Button, TextInput, } from "@react-native-material/core";
import exercises from './exercises';

export default function ReturningUsers({ option, setOption }) {
  const [userData, setUserData] = useState({ exercises: exercises, selected: [], updateExer: false, goal: '', updateData: false });

  //SELECT EXERCISES TO USE
  const chooseExercise = (exer) => {
    const name = exer.name;
    const arry = userData.selected
      .some((exer) => exer.chosen === true) ? 'selected' : 'exercises';

    //EXERCISE PLAN
    const plan = userData[arry]
      .map((item) => {
        if (item.name === name) {
          return { ...item, chosen: !item.chosen }
        }
        return item;
      })
    setUserData({ ...userData, selected: plan });
  }

  //DISPLAY EXERCISES BASED ON SELECTION
  const displayExer = () => {
    const checkData = userData.selected.some((exer) => exer.chosen === true);
    if (!checkData) return;
    const filtered = userData.selected.filter((exer) => exer.chosen === true)
    setUserData({ ...userData, selected: filtered, updateData: !userData.updateData })
  }

  //PROVIDES EXERCISE PLAN IF USER PROVIDES EXERCISE DATA
  const showPlan = () => { }

  // useEffect(() => {
  //   console.log(userData.selected)
  // }, [userData])

  if (!userData.updateData) {
    return (
      <View>
        <Text style={styles.title}>Select previous exercises</Text>
        {userData.exercises.map((exer) => {
          return (
            <View key={`key${exer.name}${exer.name}`} style={{ marginBottom: 16 }}>
              <Button title={exer.name} onPress={() => chooseExercise(exer)} />
            </View>
          )
        })
        }
        <Button title="Add Data" onPress={displayExer} />
      </View>
    )
  }

  if (userData.updateData) {
    return (
      <View>
        <Text style={styles.title}>Select previous exercises</Text>
        {userData.selected.map((exer) => {
          return (
            <View key={`key${exer.name}${exer.name}`} style={{ marginBottom: 16 }}>
              <Text>{exer.name}</Text>
              <Button title={exer.name} onPress={() => chooseExercise(exer)} />
            </View>
          )
        })
        }
        <Button title="Enter" />
        <Button title="Start Over" onPress={() => setUserData({ exercises: exercises, selected: [], updateExer: false, goal: '', updateData: false })} />
      </View>
    )
  }
}

/* 
EXERCISE ICONS
https://www.gograph.com/vector-clip-art/exercise-stick-figure.html


BEGINNER
SETS 1-2
REPS 8-12
2-3 PER WEEK
INTENSITY 60-80%

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
