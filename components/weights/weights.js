import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { Switch, Text } from 'react-native-paper';
import ReturningUsers from './returningUsers';
import NewUser from './newUser';

export default function Weights() {
  const [option, setOption] = useState('buttons');
  const [isSwitchOn, setIsSwitchOn] = useState(false);
  const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);


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


  //SUGGESTED EXERCISE DATES
  const exerciseDates = (days) => {
    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();
    const futureTime = new Date(year, month, day + days);
    return `${futureTime.getMonth() + 1}/${futureTime.getDate()}`;
  }

  if (option === 'buttons') {
    return (
      <View>
        <View style={{ display: 'flex', flexDirection: 'row' }}>
          <Text variant="headlineSmall">New Users</Text>
          <Switch value={isSwitchOn} onValueChange={onToggleSwitch} />
          <Text variant="headlineSmall">Returning Users</Text>
        </View>
      </View>
    );
  }

  if (option === 'new user') {
    return (
      <View>
        <Text>Weight Lifting</Text>
        <NewUser
          calcWeight={calcWeight}
          exerciseDates={exerciseDates} />
      </View>
    )
  }

  if (option === 'returning user') {
    return (
      <View>
        <Text>Weight Lifting</Text>
        <ReturningUsers
          option={option}
          setOption={setOption}
          calcWeight={calcWeight}
          exerciseDates={exerciseDates} />
      </View>
    )
  }
}

/* 
EXERCISE ICONS
https://www.gograph.com/vector-clip-art/exercise-stick-figure.html
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
