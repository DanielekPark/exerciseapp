import React, { useState } from 'react';
import { StyleSheet, View, Dimensions, TextInput } from 'react-native';
import { Text, Button } from 'react-native-paper';
import Plan from './plan';
import BadgeColors from './badgeColors';

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
      setUserData({ ...userData, category: 'upper', list: filtered });
    }

    if (selection === 'lower') {
      const filtered = userData.exercises.filter((exer) => {
        if (exer.muscleGroup === 'thigh') return exer;
        if (exer.muscleGroup === 'hamstring') return exer;
        if (exer.muscleGroup === 'calf') return exer;
      });
      setUserData({ ...userData, category: 'lower', list: filtered });
    }

    //EXERCISES FOR 3 DAYS PER WEEK AVAILABLITY
    if (selection === 'chest_tri') {
      const filtered = userData.exercises.filter((exer) => {
        if (exer.muscleGroup === 'chest') return exer;
        if (exer.muscleGroup === 'triceps') return exer;
        if (exer.muscleGroup === 'shoulders') return exer;
      });
      setUserData({ ...userData, category: 'chest_tri', list: filtered });
    }
    if (selection === 'back_bic') {
      const filtered = userData.exercises.filter((exer) => {
        if (exer.muscleGroup === 'back') return exer;
        if (exer.muscleGroup === 'biceps') return exer;
      });
      setUserData({ ...userData, category: 'back_bic', list: filtered });
    }
    if (selection === 'core_legs') {
      const filtered = userData.exercises.filter((exer) => {
        if (exer.muscleGroup === 'core') return exer;
        if (exer.muscleGroup === 'hamstring') return exer;
        if (exer.muscleGroup === 'thigh') return exer;
      });
      setUserData({ ...userData, category: 'core_legs', list: filtered });
    }
  }

  // 2 DAY AVAILABILITY
  if (userData.days === 2) {
    return (
      <View>
        <View style={styles.days}>
          <View style={styles.daysTxt}>
            <Text>Choose a category</Text>
          </View>
          <View style={styles.btnContainer}>
            <Button
              onPress={() => provideSelection('upper')}
              mode={userData.category === 'upper' ? 'contained' : 'outlined'}>
              Upper
            </Button>
            <Button
              style={styles.rightBtn}
              onPress={() => provideSelection('lower')}
              mode={userData.category === 'lower' ? 'contained' : 'outlined'}>
              Lower
            </Button>
          </View>
        </View>
        <View>
          <View style={styles.daysTxt}>
            <Plan
              setUserData={setUserData}
              userData={userData} />
          </View>
        </View>
      </View>
    )
  }

  // 3 DAY AVAILBILITY
  if (userData.days === 3) {
    return (
      <View style={styles.days}>
        <View style={styles.daysTxt}>
          <Text>Choose a category</Text>
          <View style={styles.btnWrapper}>
            <Button
              style={styles.btn}
              onPress={() => provideSelection('back_bic')}
              mode={userData.category === 'back_bic' ? 'contained' : 'outlined'}>
              Back & Biceps
            </Button>
            <Button
              style={styles.btn}
              onPress={() => provideSelection('chest_tri')}
              mode={userData.category === 'chest_tri' ? 'contained' : 'outlined'}>
              Chest & Triceps
            </Button>
            <Button
              style={styles.btn}
              onPress={() => provideSelection('core_legs')}
              mode={userData.category === 'core_legs' ? 'contained' : 'outlined'}>
              Core & Legs
            </Button>
          </View>
          <Plan
            setUserData={setUserData}
            userData={userData} />
        </View>
      </View>
    )
  }
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
  },
  btnWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 25
  },
  btn: {
    marginBottom: 10
  }
});

export default Schedule