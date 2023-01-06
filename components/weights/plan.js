import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, Button, TextInput, Card, Paragraph, Badge } from 'react-native-paper';
import exercises from './exercises';
import badgeColors from './badgeColors';
// import { calcWeight, exerciseDates } from '../../utils';

const Plan = ({ userData, setUserData }) => {

  //SELECTS 1 EXERCISE & UNSELECTS EXERCISES THAT TARGETS THE SAME MUSCLES
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

    const limit = userData.days === 2 || userData.days === 3 ? 1 : 2;

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

    //unselects exercises of the same muscle group 
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

  //SHOWS PLAN IF DATA IS PROVIDED
  const showInputs = () => {
    if (userData.list.length < 1) return;
    const selected = userData.list
      .filter((exer) => exer.chosen === true);
    setUserData({ ...userData, plan: selected, showInputs: true });
  }

  // useEffect(() => {
  //   console.log(userData.list)
  // }, [userData])

  return (
    <View style={styles.days}>
      <View style={styles.daysTxt}>
        <View>

        </View>
        <Text  variant="titleSmall">
          {!userData.Inputs ?
            'Choose 1 exercise per muscle group'
            :
            'Enter numbers for reps & weight'
          }
        </Text>

        {/* EXERCISE TYPE COLOR CODES */}
        <View style={styles.bdWrap}>
          {badgeColors.map((bdc) => {
            return (
              <View
                style={styles.bdBox}
                key={bdc.backgroundColor + bdc.muscleGroup}>
                <Text style={styles.muscleTxt}>
                  {bdc.muscleGroup[0].toUpperCase() + bdc.muscleGroup.slice(1)}
                </Text>
                <Badge
                  style={[{ backgroundColor: bdc.backgroundColor }]} />
              </View>
            )
          })}
        </View>
        {!userData.showInputs ?
          <View style={styles.wrapper}>
            {userData?.list?.map((exer) => {
              return (
                <View key={`React-${exer.name}-key`} >
                  <Button
                    style={exer.chosen ? [{ marginBottom: 10 }, { backgroundColor: exer.color }] : [{ marginBottom: 10 }]}
                    onPress={() => chooseExercise(exer)}
                    textColor={exer.chosen ? '' : exer.color}
                    mode={exer.chosen ? 'contained' : 'outlined'}>
                    {exer.name}
                  </Button>
                </View>
              )
            })}
          </View>
          :
          <View style={styles.inputWrap}>
            {/* COLLECTS USER EXERCISE DATA */}
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

        {/* SHOW SELECTED EXERCISES BELOW WITH INPUTS */}
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
                onPress={() => setUserData({ ...userData, showPlan: true })}>
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

        {/* WEIGHT LIFTING PLAN*/}
        {userData.showPlan ?
          <View>
            <Card style={styles.infoCard}>
              <Card.Title title="Warm up" subtitle={`Week of ${exerciseDates(0)}`} />
              <Card.Content>
                <Paragraph>{userData.category.charAt(0).toUpperCase() + userData.category.slice(1)} body workout</Paragraph>
                <Paragraph>Rest between sets: 2 min</Paragraph>
                {userData.plan.map((exer) => {
                  return (
                    <View key={`warmup-key${exer.name}`}>
                      <Paragraph>{exer.name}  2 - 3 sets   8-12 reps {calcWeight(exer, 0.5)}lbs</Paragraph>
                    </View>
                  )
                })}
              </Card.Content>
            </Card>
            <Card style={styles.infoCard}>
              <Card.Title title="Workout" subtitle={`Week of ${exerciseDates(0)}`} />
              <Card.Content>
                <Paragraph>{userData.category.charAt(0).toUpperCase() + userData.category.slice(1)} body workout</Paragraph>
                <Paragraph>Rest between sets: {`${userData.goals === 'muscleSize' ? `1-2` : `2-3`}`}  min</Paragraph>
                {userData.plan.map((exer) => {
                  return (
                    <View key={`week1-key${exer.name}`}>
                      <Paragraph>{exer.name}  2 - 3 sets   12 reps {`${userData.goals === 'muscleSize' ? `${calcWeight(exer, 0.7)}` : `${calcWeight(exer, 0.6)}`}`} lbs</Paragraph>
                    </View>
                  )
                })}
              </Card.Content>
            </Card>
            <Card style={styles.infoCard}>
              <Card.Title title="Workout" subtitle={`Week of ${exerciseDates(7)}`} />
              <Card.Content>
                <Paragraph>{userData.category.charAt(0).toUpperCase() + userData.category.slice(1)} body workout</Paragraph>
                <Paragraph>Rest between sets: {`${userData.goals === 'muscleSize' ? `1-2` : `2-3`}`} min</Paragraph>
                {userData.plan.map((exer) => {
                  return (
                    <View key={`week2-key${exer.name}`}>
                      <Paragraph>{exer.name}  2 - 3 sets   10 reps {`${userData.goals === 'muscleSize' ? `${calcWeight(exer, 0.65)}` : `${calcWeight(exer, 0.75)}`}`} lbs</Paragraph>
                    </View>
                  )
                })}
              </Card.Content>
            </Card>
          </View>
          :
          ""
        }
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
  infoCard: {
    marginBottom: 10,
  },
  bdWrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    marginBottom: 10,
  },
  bdBox: {
    width: '30%',
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 10,
    justifyContent: 'center'
  },
  muscleTxt: {
    paddingRight: 5
  },
});

export default Plan;