import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, TextInput } from 'react-native';
import { Stack, Button } from "@react-native-material/core";
import exercises from './exercises';
import WeightExercises from './weightExercises';

const Schedule = ({ userData, setUserData }) => {

  //FILTER EXERCISES BASED ON USER SELECTION & SET EXERCISE CATEGORY
  const provideSelection = (selection) => {
    //EXERCISES FOR 2 DAYS PER WEEK AVAILABLITY
    if (selection === 'upper') {
      const filtered = userData.exercises.filter((exer) => {
        if (exer.muscleGroup === 'chest') return exer;
        if (exer.muscleGroup === 'back') return exer;
        if (exer.muscleGroup === 'core') return exer;
      });
      setUserData({ ...userData, plan: [...filtered] })
    }
    if (selection === 'lower') {
      const filtered = userData.exercises.filter((exer) => {
        if (exer.muscleGroup === 'thigh') return exer;
        if (exer.muscleGroup === 'hamstring') return exer;
        if (exer.muscleGroup === 'calf') return exer;
      });
      setUserData({ ...userData, plan: [...filtered] })
    }

    //EXERCISES FOR 3 DAYS PER WEEK AVAILABLITY
    if (selection === 'chest_tri') {
      const filtered = userData.exercises.filter((exer) => {
        if (exer.muscleGroup === 'chest') return exer;
        if (exer.muscleGroup === 'triceps') return exer;
        if (exer.muscleGroup === 'shoulders') return exer;
      });
      setUserData({ ...userData, plan: [...filtered] })
    }
    if (selection === 'back_bic') {
      const filtered = userData.exercises.filter((exer) => {
        if (exer.muscleGroup === 'back') return exer;
        if (exer.muscleGroup === 'biceps') return exer;
      });
      setUserData({ ...userData, plan: [...filtered] })
    }
    if (selection === 'core_legs') {
      const filtered = userData.exercises.filter((exer) => {
        if (exer.muscleGroup === 'core') return exer;
        if (exer.muscleGroup === 'hamstring') return exer;
        if (exer.muscleGroup === 'thigh') return exer;
      });
      setUserData({ ...userData, plan: [...filtered] })
    }
  }

  // 2 DAY AVAILABILITY
  if (userData.days === 2) {
    return (
      <>
        <Text>Choose a workout day</Text>
        <View style={styles.btnContainer}>
          <Button title="Upper body" onPress={() => provideSelection('upper')} />
          <Button title="Lower body" onPress={() => provideSelection('lower')} />
        </View>
        <WeightExercises setUserData={setUserData} userData={userData} />
      </>
    )
  }

  // 3 DAY AVAILBILITY
  if (userData.days === 3) {
    return (
      <>
        <Text>Choose a workout day</Text>
        <View style={styles.btnContainer}>
          <Button title="Chest & triceps" onPress={() => provideSelection('chest_tri')} />
          <Button title="Back & biceps" onPress={() => provideSelection('back_bic')} />
          <Button title="Core & legs" onPress={() => provideSelection('core_legs')} />
        </View>
        <WeightExercises setUserData={setUserData} userData={userData} />
      </>
    )
  }
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

export default Schedule