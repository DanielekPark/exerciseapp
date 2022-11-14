import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { Stack, Button, TextInput } from "@react-native-material/core";

// Component calculates/estimate the user's strength based on the weight used and number of repetitions completed
export default function Calculator() {
  const [fitData, setFitData] = useState({ weight: '', reps: '', oneRepMax: '', exp: 'beginner' });

  //Calculates recommended weight based on weight & repetitions completed
  const calcStrength = () => {
    //wt / 1.0278 - (reps x 0.0278)
    const weight = fitData.weight / 1;
    const repetitions = fitData.reps / 1;
    if (!weight) return;
    if (!repetitions) return;
    if (weight < 5) return;
    if (repetitions < 5) return;
    const maxRep = (weight / 1.0278) - (repetitions * 0.0278);

    setFitData({ ...fitData, reps: repetitions })
    setFitData({ ...fitData, weight: weight })
    setFitData({ ...fitData, oneRepMax: maxRep })

  }

  useEffect(() => {
    console.log(fitData)
  }, [fitData])

  //Resets the calculator
  const reset = () => { }

  return (
    <View>
      <View>
        <Text style={styles.title}>
          Calculate your strength
        </Text>
        <View>
          <Button title="Beginner" onPressIn={() => setFitData({ ...fitData, exp: 'beginner' })} />
          <Button title="Intermediate" onPressIn={() => setFitData({ ...fitData, exp: 'intermediate' })} />
        </View>
        <View style={{ margin: 16 }} >
          <TextInput keyboardType="numeric" style={{ margin: 16 }} label="Weight" />
          <TextInput keyboardType="numeric" style={{ margin: 16 }} label="Repetitions completed" />
        </View>
        <View>
          <Button title="Enter" />
        </View>
        <View>
          <Text>
            Estimaged maximum amount of weight that can be lifted for 1 repetition {fitData.oneRepMax ? fitData.oneRepMax : ''}

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

// Formula to calculate strength
// wt/1.0278-(reps x 0.0278)
// need input & buttons
//check the numbers that are more than 5 and less than 250