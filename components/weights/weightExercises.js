import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, } from 'react-native';
import { Stack, Button, TextInput } from "@react-native-material/core";
import exercises from './exercises';

const WeightExercises = ({ userData, setUserData }) => {

  //SELECT 1 EXERCISE & REMOVE EXERCISES THAT TARGETS THE SAME MUSCLES
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
                      placeholder={`Amount of weight used`}
                      keyboardType="numeric"
                    />
                    <TextInput
                      placeholder={`Amount of weight used`}
                      keyboardType="numeric"
                    />
                  </>
                }
              </View>
            </View>
          )
        })}
        <Button title="Enter" />
        <Button title="Start Over" />

        {/* DISPLAY EXERCISES BELOW

        <View>
        </View>
        */}

      </>)
  }

}

export default WeightExercises