import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, Button, TextInput, Card, Title } from 'react-native-paper';
import exercises from './exercises';
// import { calcWeight, exerciseDates } from '../../utils';

const WeightExercises = ({ userData, setUserData }) => {

  //SELECTS 1 EXERCISE & HIDES EXERCISES THAT TARGETS THE SAME MUSCLES
  const chooseExercise = (exer) => {
    if (userData.days < 2) return;

    const countSelected = userData.list
      .reduce((total, item) => {
        if (item.muscleGroup === exer.muscleGroup) {
          if (item.chosen) {
            total += 1;
          }
        }
        return total;
      }, 0);

    const limit = userData.days === 2 ? 1 : 2;

    //selects exercise 
    if (countSelected < limit) {
      const update = userData.list
        .map((item) => {
          if (item.muscleGroup === exer.muscleGroup) {
            if (item.name === exer.name) {
              return { ...item, chosen: true };
            }
          }
          return item;
        });
      setUserData({ ...userData, list: update });
    }

    //unselects all exercise of the same muscle group 
    if (countSelected === limit) {
      const addToPlan = userData.list
        .map((item) => {
          if (item.muscleGroup === exer.muscleGroup) {
            if (item.name !== exer.name) {
              return { ...item, chosen: false };
            } else {
              return { ...item, chosen: true }
            }
          }
          return item;
        });
      setUserData({ ...userData, list: addToPlan });
    }
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
  const showInputs = () => {
    if (userData.list.length < 1) return;
    const selected = userData.list
      .filter((exer) => exer.chosen === true);
    setUserData({ ...userData, plan: selected, showInputs: true });
  }

  const createPlan = () => { }

  useEffect(() => {
    console.log(userData.list)
  }, [userData])

  return (
    <View style={styles.days}>
      <View style={styles.daysTxt}>
        <Text>
          {!userData.Inputs ?
            'Choose 1 exercise per muscle group'
            :
            'Enter numbers for reps & weight'
          }
        </Text>
        {!userData.showInputs ?
          <View style={styles.wrapper}>
            {userData?.list?.map((exer) => {
              return (
                <View key={`React-${exer.name}-key`} >
                  <Button
                    style={styles.exerBtn}
                    onPress={() => chooseExercise(exer)}
                    mode={exer.chosen ? 'contained' : 'outlined'}>
                    {exer.name}
                  </Button>
                </View>
              )
            })}
          </View>
          :
          <View style={styles.inputWrap}>
            {userData?.plan?.map((exer) => {
              return (
                <View
                  style={styles.input}
                  key={`React--key${exer.name}`}
                >
                  <Text>{exer.name}</Text>
                  <TextInput
                    onChangeText={(value) => addRepsWeights(value, exer.name, 'weight', exer)}
                    label="Weight"
                    keyboardType='numeric'
                  />
                  <TextInput
                    onChangeText={(value) => addRepsWeights(value, exer.name, 'reps', exer)}
                    label="Reps"
                    keyboardType='numeric'
                  />
                </View>
              )
            })}
          </View>}

        {/* SHOW SELECTED EXERCISES BELOW W/ INPUT */}

        <View style={styles.days}>
          <View style={styles.btnContainer}>
            {!userData.showInputs ?
              <Button
                mode="contained"
                onPress={showInputs}>
                Enter
              </Button>
              :
              <Button
                mode="contained"
                onPress={() => setUserData({ ...userData, showPlan: true })}
              >
                Create Plan
              </Button>
            }
            <Button
              style={styles.rightBtn}
              onPress={() => setUserData({ exercises: exercises, list: [], plan: [], days: 0, level: '', category: '', showInputs: false, showPlan: false, goals: '' })}
              mode='contained'>
              Start Over
            </Button>
          </View>
        </View>
        {/* WEIGHT LIFTING SCHEDULE*/}
        <View style={styles.card}>
          {userData.showPlan ?
            <View>
              <Card>
                <Card.Title title="Card Title" subtitle="Card Subtitle" />
                <Card.Content>
                  <Title>Card title</Title>
                  <Paragraph>Card content</Paragraph>
                </Card.Content>
              </Card>
            </View>
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
    marginRight: 'auto'
  },
  rightBtn: {
    marginLeft: 5
  },
  wrapper: {
    paddingTop: 10,
    justifyContent: 'space-around',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignContent: 'center'
  },
  exerBtn: {
    marginBottom: 10
  },
  inputWrap: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingTop: 20,
  },
  input: {
    width: '45%',
    marginBottom: 20
  },
  card: {
    borderWidth: 2,
    borderColor: 'red'
  },

});

export default WeightExercises

/* (
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
            ) */

