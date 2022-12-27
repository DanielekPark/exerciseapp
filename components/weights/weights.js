import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, Button } from 'react-native-paper';
import ReturningUsers from './returningUsers';
import NewUser from './newUser';

const btns = [
  {
    level: 'New User',
    selected: true
  },
  {
    level: 'Returning User',
    selected: false
  }
];

export default function Weights() {
  const [buttons, setButtons] = useState(btns);

  //CALCULATES HEAVIEST WEIGHT USER CAN LIFT
  const calcWeight = (exer, percentage) => {
    //Converts a string to a whole number
    const weight = Math.trunc(exer.weight / 1);
    const repetitions = Math.trunc(exer.reps / 1);
    if (weight < 1 || repetitions < 1) return;

    //ESTIMATED HEAVIEST WEIGHT THAT CAN BE LIFT
    const oneRepMax = Math.round(weight / (1.0287 - (0.0278 * repetitions)));
    //SUGGESTED WEIGHT
    return Math.round((oneRepMax * percentage) / 5) * 5;
  }

  //HIGHLIGHT BUTTON WHEN PRESSED
  const activeBtn = (btn, level) => {
    const active = buttons.map((item) => {
      if (btn.level === level) {
        return { ...item, selected: !item.selected };
      }
      return item;
    });
    setButtons(active);
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

  return (
    <View>
      <Text variant="headlineSmall" style={styles.txtCenter}>Weight Lifting</Text>
      <View style={styles.btnContainer}>
        {buttons.map((btn) => {
          return (
            <Button
              key={btn.level + 'buttonKey'}
              mode={btn.selected ? 'contained' : 'outlined'}
              onPress={() => activeBtn(btn, btn.level)}
            >
              {btn.level}
            </Button>
          )
        })}
      </View>
      {buttons[0].selected ?
        <View>
          <NewUser
            calcWeight={calcWeight}
            exerciseDates={exerciseDates} />
        </View>
        :
        <View>
          <ReturningUsers
            calcWeight={calcWeight}
            exerciseDates={exerciseDates} />
        </View>
      }
    </View>
  );
}

const styles = StyleSheet.create({
  txtCenter: {
    textAlign: 'center'
  },
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 20,
  }
});
