import React, { useState } from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { Button } from 'react-native-paper';
import exercises from './exercises';

export default function ReturningUsers() {
  const [userData, setUserData] = useState({ exercises: exercises, selected: [], goal: '', updateData: false, updatePlan: false, showPlan: false });

  //SELECT EXERCISES TO USE
  const chooseExercise = (exer) => {
    const name = exer.name;
    const hookArry = userData.selected
      .some((exer) => exer.chosen === true) ? 'selected' : 'exercises';

    const plan = userData[hookArry]
      .map((item) => {
        if (item.name === name) {
          return { ...item, chosen: !item.chosen }
        }
        return item;
      })
    setUserData({ ...userData, selected: plan });
  }

  //DISPLAY EXERCISES BASED ON SELECTION
  const displaySelected = () => {
    const checkData = userData.selected.some((exer) => exer.chosen === true);
    if (!checkData) return;
    const filtered = userData.selected.filter((exer) => exer.chosen === true);

    setUserData({ ...userData, selected: filtered, updateData: !userData.updateData })
  }

  //USER ENTERS DATA FROM PREVIOUS DAYS
  const updateData = (value, exer, objKey) => {
    const updatedPlan = userData.selected.map((item) => {
      if (item.name === exer.name) {
        return { ...item, [objKey]: value / 1 };
      }
      return item;
    });
    setUserData({ ...userData, selected: updatedPlan });
  }


  //CALCULATES HEAVIEST WEIGHT USER CAN LIFT
  const calcWeight = (exer, percentage) => {
    //Converts a string to a whole number
    const weight = Math.trunc(exer.weight / 1);
    const repetitions = Math.trunc(exer.reps / 1);
    if (weight < 1 || repetitions < 1) return;

    const oneRepMax = Math.round(weight / (1.0287 - (0.0278 * repetitions)));
    //SUGGESTED WEIGHT
    return Math.round((oneRepMax * percentage) / 5) * 5;
  }


  //SUGGESTED EXERCISE DATES
  const exerciseDates = (days) => {
    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();
    const futureTime = new Date(year, month, day + days);
    return `${futureTime.getMonth() + 1}/${futureTime.getDate()}`;
  }

  // useEffect(() => {
  //   console.log(userData.selected, 'line 50 returningUsers')
  // }, [userData])

  if (userData.updateData === false) {
    return (
      <View>
        <Text style={styles.title}>Select previous exercises</Text>
        {userData.exercises.map((exer) => {
          return (
            <View key={`key${exer.name}`} style={{ marginBottom: 16 }}>
              <Button title={exer.name} onPress={() => chooseExercise(exer)} />
            </View>
          )
        })
        }
        <Button title="Add Data" onPress={displaySelected} />
      </View>
    )
  }

  if (userData.updateData === true) {
    return (
      <View>
        <Text style={styles.title}>Provide weight & repetitions</Text>
        {userData.selected.map((exer) => {
          return (
            <View key={`reactkey${exer.name}`} style={{ marginBottom: 16 }}>
              <Text>{exer.name}</Text>
              <TextInput placeholder='Weight' onChangeText={(value) => updateData(value, exer, 'weight')} keyboardType='numeric' />
              <TextInput placeholder='Reps completed' onChangeText={(value) => updateData(value, exer, 'reps')} keyboardType='numeric' />
            </View>
          )
        })
        }
        <Button title="Enter" onPress={() => setUserData({ ...userData, showPlan: true })} />


        {userData.showPlan ?
          (
            userData.selected.map((exer, index) => {
              return (
                <View key={`${index + exer.name + exer.muscleGroup}`} style={{ marginBottom: 16 }}>
                  <Text style={{ fontWeight: 'bold' }}>{exer.name}</Text>
                  <Text>
                    Warmup exercises for the week of {exerciseDates(0)} 3 sets {calcWeight(exer, 0.6)}lbs 12 reps
                  </Text>
                  <Text>
                    Number of sets 1 - 3 per exercise
                  </Text>
                  <Text>
                    Rest duration between sets 1 - 2 min
                  </Text>
                  <Text>
                    Week 1: Week of {exerciseDates(0)} {calcWeight(exer, 0.7)}lbs 12 reps
                  </Text>
                  <Text>
                    Week 2: Week of {exerciseDates(7)} {calcWeight(exer, 0.75)}lbs 10 reps
                  </Text>
                  <Text>
                    Week 3: Week of {exerciseDates(14)} {calcWeight(exer, 0.8)}lbs 8 reps
                  </Text>
                </View>
              )
            })
          )
          : ''}
        <Button title="Start Over" onPress={() => setUserData({ exercises: exercises, selected: [], updateData: false, updatePlan: false, showPlan: false })} />
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
