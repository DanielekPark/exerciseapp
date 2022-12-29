import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, Button, TextInput } from 'react-native-paper';


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

    setFitData({ ...fitData, reps: repetitions });
    setFitData({ ...fitData, weight: weight });
    setFitData({ ...fitData, oneRepMax: oneRepMax });
  }

  return (
    <View>
      <View>
        <Text variant="headlineMedium" style={[styles.txtCenter, styles.title]}>
          Calculate your strength
        </Text>
        <View style={styles.numbersDisplay}>
          {fitData.oneRepMax ?
            <>
              <Text>
                Estimated max weight for 1 repetition for an exercise
              </Text>
              <Text variant="headlineSmall" style={[styles.txtCenter, styles.numbersDisplay]}>
                {`${fitData.oneRepMax}lbs (${Math.round(fitData.oneRepMax / 2.2)}kg)`}
              </Text>
            </>
            :
            ""
          }

        </View>
        <View style={styles.btnContainer}>
          <Button
            onPress={() => setFitData({ ...fitData, exp: 'beginner' })}
            mode="contained"
            style={styles.leftBtn}
          >
            Beginner
          </Button>
          <Button
            onPress={() => setFitData({ ...fitData, exp: 'intermediate' })}
            mode="contained"
            style={styles.rightBtn}
          >
            Intermediate
          </Button>
        </View>
        <View style={styles.inputsWrap} >
          <TextInput keyboardType="numeric" style={styles.input} maxLength={3} onChangeText={(value) => setFitData({ ...fitData, weight: value })} label="Weight, min 7lbs" />
          <TextInput keyboardType="numeric" style={styles.input} maxLength={2} onChangeText={(value) => setFitData({ ...fitData, reps: value })} label="Repetitions, max 15" />
        </View>
        <View style={styles.btnContainer}>
          <Button
            style={styles.enterBtn}
            onPress={calcStrength}
            mode='contained'
          >
            Enter
          </Button>
        </View>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    marginTop: 10,
  },
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 20
  },
  leftBtn: {
    marginRight: 2
  },
  rightBtn: {
    marginLeft: 2
  },
  numbersDisplay: {
    marginTop: 25,
    marginTop: 25,
  },
  txtCenter: {
    textAlign: 'center'
  },
  inputsWrap: {
    marginTop: 30,
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  input: {
    width: '45%',
    fontSize: 12
  },
  enterBtn: {
    width: '50%'
  }
});

//https://www.nfpt.com/blog/calculating-a-clients-1rm#:~:text=This%20formula%20states%20that%20an,performed%20for%20the%20given%20exercise.
/* This formula states that an individual’s 1RM = w ÷ [(1.0278) – (0.0278 x r)]. The w represents the weight, in pounds, lifted for 10 successful repetitions. The r stands for the number of repetitions performed for the given exercise. */