import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, Button } from 'react-native-paper';
import exercises from './exercises';

const WeightExercises = ({ userData, setUserData, calcWeight, exerciseDates }) => {

  //SELECTS 1 EXERCISE & HIDES EXERCISES THAT TARGETS THE SAME MUSCLES
  const chooseExercise = (exer) => {
    const muscleGroup = exer.muscleGroup;
    const name = exer.name;

    const addToPlan = userData.plan
      .map((item) => {
        if (item.name === name) {
          return { ...item, chosen: !item.chosen }
        }
        return item;
      })
      .filter((item) => {
        if (item.name === name) {
          return exer;
        }
        if (item.muscleGroup !== muscleGroup) {
          return exer;
        }
      });
    setUserData({ ...userData, plan: addToPlan });
  }

  //SETS INFO FOR REPS & SETS
  const addRepsWeights = (value, exerciseName, objKey, exer) => {
    const updatedInfo = userData.plan.map((obj) => {
      if (exerciseName === exer.name) {
        return { ...obj, [objKey]: value };
      }
      return obj;
    });
    setUserData({ ...userData, plan: updatedInfo });
  }

  //SHOWS PLAN IF INFO IS PROVIDED
  const showPlan = () => {
    if (userData.plan.length < 1) return;
    const checkInfo = userData.plan.every((obj) => obj.weight > 0 && obj.reps > 0);
    if (!checkInfo) return;
    setUserData({ ...userData, showPlan: true });
  }

  return (
    <View style={styles.days}>
      <View style={styles.daysTxt}>
        <Text>Choose 1 exercise per muscle group</Text>
        {userData?.plan?.map((exer) => {
          return (
            <View key={`${exer.name}${exer.muscleGroup}`}>
              <View>
                {!exer.chosen ?
                  <Button title={exer.name} onPress={() => chooseExercise(exer)} />
                  :
                  <>
                    <Text>{exer.name}</Text>
                    <TextInput
                      onChangeText={(value) => addRepsWeights(value, exer.name, 'weight', exer)}
                      placeholder={`Weight used`}
                      keyboardType="numeric"
                    />
                    <TextInput
                      onChangeText={(value) => addRepsWeights(value, exer.name, 'reps', exer)}
                      placeholder={`Reps completed`}
                      keyboardType="numeric"
                    />
                  </>
                }
              </View>
            </View>
          )
        })}

        <View style={styles.days}>
          <View style={styles.daysTxt}>
            <Text>Choose a category</Text>
          </View>
          <View style={styles.btnContainer}>
            <Button
              onPress={showPlan}
              mode="outlined">
              Enter
            </Button>
            <Button
              style={styles.rightBtn}
              onPress={() => setUserData({ exercises: exercises, plan: [], days: 0, level: '', category: '', showPlan: false, goals: '' })}
              mode={userData.category === 'lower' ? 'contained' : 'outlined'}>
              Start Over
            </Button>
          </View>
        </View>
        {/* <Button title="Enter" onPress={showPlan} />
      <Button title="Start Over" onPress={() => setUserData({ exercises: exercises, plan: [], days: 0, level: '', category: '', showPlan: false, goals: '' })} /> */}

        {/* WEIGHT LIFTING SCHEDULE*/}
        <View>
          {userData.showPlan ?
            (
              userData.plan.map((exer) => {
                return (
                  <View key={`${exer.name}+${exer.name}`} style={{ marginBottom: 16 }}>
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
            :
            ''
          }
        </View>
      </View>
    </View>
  )

}

const styles = StyleSheet.create({
  days: {
    marginTop: 30,
    marginBottom: 30,
    flexDirection: 'row',
  },
  daysTxt: {
    marginTop: 'auto',
    marginBottom: 'auto'
  },
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 'auto',
  },
  rightBtn: {
    marginLeft: 5
  }
});

export default WeightExercises