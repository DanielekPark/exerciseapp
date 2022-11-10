import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { Stack, Button } from "@react-native-material/core";
import Calcbutton from './calcbutton';
import Row from './row';

// Component calculates/estimate the user's strength based on the weight used and number of repetitions completed
export default function Calculator() {
  const [weight, setWeight] = useState('')//weight used
  const [reps, setReps] = useState('')//number of repetitions completed

  //Resets the calculator
  const reset = () => {
    setWeight('');
    setReps('');
  }

  //Calculates recommended intensity level
  const calcStrength = () => { }

  return (
    <View style={styles.container}>
      <>
        <Text style={styles.value}>
          Calculate your strength
        </Text>
        <Text style={styles.value}>
          Weight:
        </Text>
        <Text style={styles.value}>
          Repetitions completed:
        </Text>

        {/* Number */}
        <Row>
          <Calcbutton text="7" />
          <Calcbutton text="8" />
          <Calcbutton text="9" />
        </Row>

        <Row>
          <Calcbutton text="5" />
          <Calcbutton text="6" />
          <Calcbutton text="7" />
        </Row>

        <Row>
          <Calcbutton text="1" />
          <Calcbutton text="2" />
          <Calcbutton text="3" />
        </Row>

        <Row>
          <Calcbutton text="0" />
          <Calcbutton text="Reset" />
          <Calcbutton text="Enter" />
        </Row>
      </>

      {/* add a range input to show optimal ranges for endurance, hypertrophy and strength? */}
    </View>
  );
}

const styles = StyleSheet.create({

  title: {
    fontWeight: "bold",
    marginTop: 50,
    fontSize: 24,
    textAlign: "center"
  },

});

// Formula to calculate strength
// wt/1.0278-(reps x 0.0278)
// need input & buttons
//check the numbers that are more than 5 and less than 250