import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { Stack, Button, TextInput } from "@react-native-material/core";


export default function Calculator() {
  const [fitData, setFitData] = useState({ weight: '', reps: '', oneRepMax: '', exp: 'beginner' });

  //Calculates recommended weight based on weight & repetitions completed
  const calcStrength = () => {
    const weight = fitData.weight / 1;
    const repetitions = fitData.reps / 1;
    if (!weight || weight < 7) return;
    if (!repetitions) return;
    if (repetitions < 1 || repetitions > 15) return;
    const oneRepMax = Math.round(weight / (1.0287 - (0.0278 * repetitions)));

    setFitData({ ...fitData, reps: repetitions })
    setFitData({ ...fitData, weight: weight })
    setFitData({ ...fitData, oneRepMax: oneRepMax })

  }

  //Resets the calculator
  const reset = () => { }

  return (
    <View>
      <View>
        <Text style={styles.title}>
          Calculate your strength
        </Text>
        <View>
          {/* replace beginner/intermediate buttons with toggle */}
          <Button title="Beginner" onPressIn={() => setFitData({ ...fitData, exp: 'beginner' })} />
          <Button title="Intermediate" onPressIn={() => setFitData({ ...fitData, exp: 'intermediate' })} />
        </View>
        <View style={{ margin: 16 }} >
          <TextInput keyboardType="numeric" style={{ margin: 16 }} maxLength={3} onChangeText={(value) => setFitData({ ...fitData, weight: value })} label="Weight, min 7lbs" />
          <TextInput keyboardType="numeric" style={{ margin: 16 }} maxLength={2} onChangeText={(value) => setFitData({ ...fitData, reps: value })} label="Repetitions, max 15" />
        </View>
        <View>
          <Button title="Enter" onPress={calcStrength} />
        </View>
        <View>
          <Text>
            Estimated maximum amount of weight that can be lift for 1 repetition {fitData.oneRepMax ? `${fitData.oneRepMax} lbs (${Math.round(fitData.oneRepMax / 2.2)}kg)` : ''}
          </Text>
        </View>
      </View>

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

//https://www.nfpt.com/blog/calculating-a-clients-1rm#:~:text=This%20formula%20states%20that%20an,performed%20for%20the%20given%20exercise.
/* This formula states that an individual’s 1RM = w ÷ [(1.0278) – (0.0278 x r)]. The w represents the weight, in pounds, lifted for 10 successful repetitions. The r stands for the number of repetitions performed for the given exercise. */

//check the numbers that are more than 5 and less than 250