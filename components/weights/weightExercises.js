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

  //ESTIMATES SUGGESTED WEIGHT FOR USER
  const calcWeight = (exer) => {
    //Converts a string to a whole number
    const weight = Math.trunc(exer.weight / 1);
    const repetitions = Math.trunc(exer.reps / 1);
    if (weight < 1 || repetitions < 1) return;

    const oneRepMax = Math.round(weight / (1.0287 - (0.0278 * repetitions)));

    //get upper and lower ranges of weight
    const lower = oneRepMax * 0.7;
    const upper = oneRepMax * 0.85;
    const range = [];
    for (let i = lower; i < upper; i++) {
      if (i % 5 === 0) {
        range.push(` ${i} `);
      }
      if (range.length > 4) return;
    }
    return range;
  }

  //SUGGESTED DATES FOR EXERCISE
  const exerciseDates = (days) => {
    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();
    const futureTime = new Date(year, month, day + days);
    return `${futureTime.getMonth() + 1}/${futureTime.getDate()}`;
  }

  // useEffect(() => {
  //   console.log(userData.plan)
  // }, [userData])

  return (
    <View>
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
      <Button title="Enter" onPress={showPlan} />
      <Button title="Start Over" />

      {/* DISPLAY EXERCISES & SUGGESTED WEIGHT BELOW */}
      <View>
        {userData.showPlan ?
          (
            userData.plan.map((exer) => {
              return (
                <View key={`${exer.name}+${exer.name}`} style={{ marginBottom: 16 }}>
                  <Text style={{ fontWeight: 'bold' }}>{exer.name}</Text>
                  <Text>
                    Number of sets 1 - 3 per exercise
                  </Text>
                  <Text>
                    Rest duration between sets 1 - 2 min
                  </Text>

                  {/* SUGGESTIONS FOR EXERCISE DATES & WEIGHT AMOUNT */}
                  <Text>
                    Week 1: Week of {exerciseDates(0)} {calcWeight(exer)[0]}lbs 12 reps
                  </Text>
                  <Text>
                    Week 2: Week of {exerciseDates(7)} {calcWeight(exer)[1]}lbs 10 reps
                  </Text>
                  <Text>
                    Week 3: Week of {exerciseDates(14)} {calcWeight(exer)[2]}lbs 8 reps
                  </Text>
                </View>
              )
            })
          )
          :
          ''
        }
      </View>
    </View>)
}
export default WeightExercises