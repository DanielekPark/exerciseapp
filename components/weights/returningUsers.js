import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Stack, Button, TextInput } from "@react-native-material/core";

export default function ReturningUsers({ option, setOption }) {

  return (
    <View>
      <View style={styles.btnContainer}>
        <Text style={styles.cardioBtn}>
          <Button title="Returning users" style={styles.btns} />
        </Text>
        <Text style={styles.weightsBtn}>
          <Button title="New time user" style={styles.btns} />
        </Text>
      </View>
      {/* ASK TRAINING AGE */}
      <Text style={styles.title}>Questions</Text>

      <View>
        <View>
          <View style={{ margin: 16 }} >
            <Text>Number of consecutive workout weeks</Text>
            <TextInput keyboardType="numeric" style={{ margin: 16 }} maxLength={2} label="e.g. 1" />
            <TextInput keyboardType="numeric" style={{ margin: 16 }} maxLength={2} label="Repetitions" />
          </View>
          <View>
            <Button title="Enter" />
          </View>
          <View>
            <Text>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Hic, eius!
            </Text>
          </View>
        </View>

      </View>
      {/* INPUT DATA FROM PREVIOUS WORKOUT */}
      {/* ALTER OR KEEP WORKOUT */}

      {/* FIRST TIME USERS */}
      {/* 
          QUESTIONS
          GOALS
          DAYS
         */}

      {/* SHOW WORKOUT */}
    </View>
  );
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
