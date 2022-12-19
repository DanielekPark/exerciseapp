import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, TextInput } from 'react-native';
import { Stack, Button } from "@react-native-material/core";
import exercises from './exercises';
import WeightExercises from './weightExercises';

const Schedule = ({ userData, setUserData }) => {

  //FILTER EXERCISES BASED ON USER SELECTION
  const filterExercises = () => {
    if (userData.days === 2) {
      if (userData.category === 'upper') {
        const filtered = userData.exercises.filter((exer) => {
          if (exer.muscleGroup === 'chest') return exer;
          if (exer.muscleGroup === 'back') return exer;
        });
        setUserData({ ...userData, plan: [...filtered] })
      }

      if (userData.category === 'lower') {
        const filtered = userData.exercises.filter((exer) => {
          if (exer.muscleGroup === 'thigh') return exer;
          if (exer.muscleGroup === 'hamstring') return exer;
          if (exer.muscleGroup === 'core') return exer;
        });
        setUserData({ ...userData, plan: [...filtered] })
      }
    }
    // if (userData.days === 3) {}
  }

  //SET EXERCISE CATEGORY
  const provideSelection = (category) => {
    setUserData({ ...userData, category: category })
    filterExercises()
  }

  // 2 DAY AVAILABILITY
  if (userData.days === 2) {
    return (
      <>
        <View style={styles.btnContainer}>
          <Button title="Upper body" onPress={() => provideSelection('upper')} />
          <Button title="Lower body" onPress={() => provideSelection('lower')} />
        </View>
        <WeightExercises setUserData={setUserData} userData={userData} />
      </>
    )
  }

  // DISPLAYS EXERCISES FOR UPPER BODY EXERCISES
  if (userData.category === 'upper') {
    return (
      <>
        <Text>Choose 1 exercise per muscle group</Text>
        {userData.plan.map((exer) => {
          return (
            <View key={`${exer.name}${exer.muscleGroup}`}>
              <TextInput />
              <Button title="Enter" />
            </View>
          )
        })}
      </>)
  }


  {/* 3 times per week 
      {userData.days === 3 ?
        <>
          <Text>Choose a category</Text>
          <View style={styles.btnContainer}>
            <Button title="Chest & triceps" />
            <Button title="Back & biceps" />
            <Button title="Core & legs" />
          </View>
        </>
        :
        ''
      }*/}


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