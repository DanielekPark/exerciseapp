import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Stack, Button } from "@react-native-material/core";
import UserSelection from './userSelection';
import ReturningUsers from './returningUsers';
import NewUser from './newUser';

export default function Weights() {
  const [option, setOption] = useState('buttons')

  if (option === 'buttons') {
    return (
      <View>
        <Text>Please choose 3 exercises and use the calc button to determine the right weight.</Text>

        <View style={styles.btnContainer}>
          {/* <Text style={styles.cardioBtn}>
            <Button title="Returning users" onPress={() => setOption('returning user')} style={styles.btns} />
          </Text>*/}
          <Text style={styles.weightsBtn}>
            <Button title="New user" onPress={() => setOption('new user')} style={styles.btns} />
            <Button title="Prev user" onPress={() => setOption('returning user')} style={styles.btns} />
          </Text>
        </View>
      </View>
    );
  }

  if (option === 'new user') {
    return (
      <View>
        <Text>Weight Lifting</Text>
        <NewUser option={option} setOption={setOption} />
      </View>
    )
  }

  if (option === 'returning user') {
    return (
      <View>
        <Text>Weight Lifting</Text>
        <ReturningUsers option={option} setOption={setOption} />
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

HIPS: Legs press, dumbbell squat, knee extension
LEGS: Hamstring curl, db deadlift
CHEST: Machine chest press, dips 
BACK: Machine row, pullup machine
SHOULDER: Dumbbell raise, face pull
ABS: Curl up, leg raises, planks
*/

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
});
