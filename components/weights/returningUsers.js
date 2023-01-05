import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import { Button, Text, TextInput, Card, Paragraph, Badge } from 'react-native-paper';
import exercises from './exercises';
import badgeColors from './badgeColors';

export default function ReturningUsers() {
  const [userData, setUserData] = useState({ exercises: exercises, selected: [], goal: '', updateData: false, updatePlan: false, showPlan: false });

  //SELECT EXERCISES
  const chooseExercise = (exer) => {
    const name = exer.name;
    const hookArry = userData.selected
      .some((exer) => exer.chosen === true) ? 'selected' : 'exercises';

    const plan = userData[hookArry]
      .map((item) => {
        if (item.name === name) {
          return { ...item, chosen: !item.chosen };
        }
        return item;
      })
    setUserData({ ...userData, exercises: plan, selected: plan });
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
  //   console.log(userData.selected, 'line 67 returningUsers')
  // }, [userData])

  if (userData.updateData === false) {
    return (
      <>
        <View style={styles.days}>
          <View style={styles.daysTxt}>

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
            <Text style={styles.txtCenter}>
              Select previous exercises
            </Text>
          </View>
        </View>
        <View style={styles.btnContainer}>
          {userData.exercises.map((exer) => {
            return (
              <View key={`option${exer.name}key`} >
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
        <View style={styles.wrapper}>
          <Button onPress={displaySelected} mode="contained" >
            Create Plan
          </Button>
        </View>
      </>
    )
  }

  if (userData.updateData === true) {
    return (
      <View>
        <Text style={styles.title}>Enter weight & repetitions</Text>
        <View style={styles.inputWrap}>
          {userData.selected.map((exer) => {
            return (
              <View key={`reactkey${exer.name}`} style={{ marginBottom: 16 }}>
                <Text>{exer.name}</Text>
                <TextInput placeholder='Weight' onChangeText={(value) => updateData(value, exer, 'weight')} keyboardType='numeric' maxLength={3} />
                <TextInput placeholder='Reps completed' onChangeText={(value) => updateData(value, exer, 'reps')} keyboardType='number-pad' maxLength={2} />
              </View>
            )
          })}
        </View>
        <View style={styles.days}>
          <View style={styles.btnContainer}>
            <Button onPress={() => setUserData({ ...userData, showPlan: true })} mode="contained" >
              Enter
            </Button>
                    <Button onPress={() => setUserData({ exercises: exercises, selected: [], updateData: false, updatePlan: false, showPlan: false })} mode="contained"
                    style={styles.rightBtn} >
          Start Over
        </Button>
          </View>
        </View>

        {userData.showPlan ?
          <View>
            <Card style={styles.infoCard}>
              <Card.Title title="Warm up" subtitle={`Week of ${exerciseDates(0)}`} />
              <Card.Content>
                <Paragraph>Rest between sets: 2 min</Paragraph>
                {userData.selected.map((exer) => {
                  return (
                    <View key={`warmup-key${exer.name}`}>
                      <Paragraph>{exer.name}: 2 - 3 sets  8-12 reps {calcWeight(exer, 0.6)}lbs</Paragraph>
                    </View>
                  )
                })}
              </Card.Content>
            </Card>
            <Card style={styles.infoCard}>
              <Card.Title title="Workout" subtitle={`Week of ${exerciseDates(0)}`} />
              <Card.Content>
                <Paragraph>Rest between sets: 2 min</Paragraph>
                {userData.selected.map((exer, index) => {
                  return (
                    <View key={`wk1returnUsers${exer.name + index}`}>
                      <Paragraph>{exer.name}: 2 - 4 sets  12 reps {calcWeight(exer, 0.7)}lbs</Paragraph>
                    </View>
                  )
                })}
              </Card.Content>
            </Card>
            <Card style={styles.infoCard}>
              <Card.Title title="Workout" subtitle={`Week of ${exerciseDates(7)}`} />
              <Card.Content>
                <Paragraph>Rest between sets: 2 min</Paragraph>
                {userData.selected.map((exer) => {
                  return (
                    <View key={`week2returnUsers${exer.name}`}>
                      <Paragraph>{exer.name}: 2 - 4 sets  10 reps {calcWeight(exer, 0.75)}lbs</Paragraph>
                    </View>
                  )
                })}
              </Card.Content>
            </Card>
          </View>
          : ''}
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
  headSpacing: {
    marginTop: 30,
  },
  txtCenter: {
    textAlign: 'center',
  },
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  exerBtn: {
    marginBottom: 10
  },
  days: {
    marginTop: 30,
    marginBottom: 30,
    flexDirection: 'column',
  },
  daysTxt: {
    marginTop: 'auto',
    marginBottom: 'auto'
  },
  inputWrap: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingTop: 20,
  },
  infoCard: {
    marginBottom: 10,
  },

  wrapper: {
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 'auto',
    marginRight: 'auto',
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
  rightBtn: {
    marginLeft: 5
  },

});
