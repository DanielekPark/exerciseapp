import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, } from 'react-native';
import { Stack, Button, TextInput } from "@react-native-material/core";
import exercises from './exercises';

const WeightExercises = ({ userData, setUserData }) => {

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

  //Sets info for reps and weight, 
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

  //Estimated weight for user 
  const calcWeight = (exer, percentage) => {
    const weight = exer.weight / 1;
    const repetitions = exer.reps / 1;
    const oneRepMax = Math.round(weight / (1.0287 - (0.0278 * repetitions)));
    console.log(weight, repetitions, oneRepMax)
    return oneRepMax * percentage;
  }

  // useEffect(() => {
  //   console.log(userData.plan)
  // }, [userData])

  if (userData.category === 'upper'
    || userData.category === 'lower') {
    return (
      <>
        <Text>Choose 1 exercise per muscle group</Text>
        {userData.plan.map((exer) => {
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
        <Button title="Enter" onPress={showPlan} />
        <Button title="Start Over" />

        {/* DISPLAY EXERCISES BELOW */}
        <View>
          {userData.showPlan ?
            (
              userData.plan.map((exer) => {
                return (
                  <View key={`${exer.name}+${exer.name}`}>
                    <Text>{exer.name}</Text>
                    <Text>
                      Recommended weight range for hypertrophy if a beginners or intermediate: {calcWeight(exer, 0.7)} - {calcWeight(exer, 0.85)}
                    </Text>
                    <Text>
                      Recommended repetition range: 8 - 12
                    </Text>
                    <Text>
                      Number of sets 1 - 3 per exercise
                    </Text>
                    <Text>
                      Rest duration between sets 1 - 2 min
                    </Text>
                  </View>
                )
              })
            )
            :
            ''
          }
        </View>
      </>)
  }

}

/* 
          <View>
            <Text>
              Recommended weight range for hypertrophy if a beginners or intermediate: {}
            </Text>
            <Text>
              Recommended repetition range: 8 - 12
            </Text>
            <Text>
              Number of sets 1 -3 per exercise
            </Text>
            <Text>
              Rest time between sets: {}
            </Text>
          </View>
*/

export default WeightExercises