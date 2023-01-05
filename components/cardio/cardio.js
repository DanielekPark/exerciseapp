import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import { Button } from 'react-native-paper';

export default function Weights() {
  const [userData, setUserData] = useState({ age: '', intensity: '', heartRange: '' });

  //ESTIMATES INTENSITY WHEN ENTER BUTTON IS PRESSED & WHEN USER ENERS AGE
  const setDifficulty = () => {

    //CHECKS IF AGE VALUE IS PROVIDED
    if (!userData.age || !userData.intensity) return;
    const age = userData.age / 1;
    if (age < 1 || age > 80) return;

    //WARMUP EXERCISE
    if (userData.intensity === 'warmup') {
      const lowerLevel = Math.round((220 - age) * 0.3);
      const upperLevel = Math.round((220 - age) * 0.39);
      const hrRange = `${lowerLevel} - ${upperLevel}`;
      setUserData({ ...userData, heartRange: hrRange });
    }
    // MODERATE INTENSITY EXERCISE
    // if (userData.intensity === 'level1') {
    //   const effortLevel = Math.round((220 - age * 0.4));
    //   heartRange.push(effortLevel);
    // }
    // if (userData.intensity === 'level2') {
    //   const effortLevel = Math.round((220 - age * 0.59));
    //   heartRange.push(effortLevel);
    // }
    // VIGOROUS INTENSITY EXERCISE
    // if (userData.intensity === 'level3') {
    //   const effortLevel = Math.round((220 - age * 0.6));
    //   heartRange.push(effortLevel);
    // }
    // if (userData.intensity === 'level4') {
    //   const effortLevel = Math.round((220 - age * 0.9));
    //   heartRange.push(effortLevel);
    // }

    // RESET DATA
    //setUserData({ age: '', intensity: '', heartRange: '' });
  }

  // useEffect(() => {
  //   console.log(userData)
  // }, [userData])

  return (
    <View>
      <View>
        {/* DISPLAYS HEART RANGE */}
        <Text>
          Recommended heart range {userData.heartRange ? `${userData.heartRange} BPM` : ''}
        </Text>
      </View>
      <Text style={styles.title}>Cardio Training</Text>
      <View style={styles.btnContainer}>
        <Text style={styles.cardioBtn}>
          <Button title="Warm up" style={styles.btns} onPress={() => setUserData({ ...userData, intensity: 'warmup' })} />
        </Text>
        <Text style={styles.weightsBtn}>
          <Button title="Level 1" style={styles.btns} onPress={() => setUserData({ ...userData, intensity: 'level1' })} />
        </Text>
        <Text style={styles.calcBtn}>
          <Button title="Level 2" style={styles.btns} onPress={() => setUserData({ ...userData, intensity: 'level2' })} />
        </Text>
        <Text style={styles.calcBtn}>
          <Button title="Level 3" style={styles.btns} onPress={() => setUserData({ ...userData, intensity: 'level3' })} />
        </Text>
        <Text style={styles.calcBtn}>
          <Button title="Level 4" style={styles.btns} onPress={() => setUserData({ ...userData, intensity: 'level4' })} />
        </Text>
      </View>

      <View>
        <TextInput
          style={styles.input}
          placeholder="Age"
          keyboardType="numeric"
          maxLength={2}
          onChangeText={(value) => setUserData({ ...userData, age: value })}

        />
        <View>
          <Text style={styles.calcBtn}>
            {/* when button is pressed, calculates intensity */}
            <Button title="Enter" style={styles.btns} onPress={setDifficulty} />
          </Text>
          <Text style={styles.calcBtn}>
            <Button title="Reset" style={styles.btns} />
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
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
    flexDirection: 'row', flexWrap: 'wrap', marginRight: 'auto', marginLeft: 'auto', marginTop: 30
  },
  cardioBtn: {
    marginRight: 5,
  },
  weightsBtn: {
    marginLeft: 5,
  },
  calcBtn: {
    marginLeft: 5,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
// Levels of cardio intensity
//   150 min moderate effort(40 - 60 %) 5 days per week
//   90 min vigorous effort(60 - 90 %) 3 days per week

// cardio 5 - 15 min warmup,

//Gwin's advice
// Take resting HR
// Take HR data for walking, jogging, and sprints
// The faster the HR returns to resting HR, the more fit the individual is 
//WORKOUT CREATION (1 mile timed w/o overexertion)
//Walking, jogging, sprinting
//e.g. if a mile is completed in 10 min aim for 9:30

// HR RANGE CALCULATIONS
// Ages 4 to 34
//maxHR = 216.6 - (0.84 * age)
// Healthy men & women
//maxHR = 208 - (0.7 * age) 
// Small group men & women
//maxHR = 220-age

/* 
USING HR for intensity 
64-70% up to 94% of max HR
FORMULA BASED ON HR MAX
//lower range   
targetHR = (max HR) * 64;
//upper range
targetHR = (max HR) * 94;
-Unconditioned ppl: might have to use 55-70%
-Conditioned ppl: might have to use 70-85%

HEART RATE RESERVE
//lower range
targetHR = [(0.4) * (HRmax - HRrest)] + HRrest
//upper range
targetHR = [(0.85) * (HRmax - HRrest)] + HRrest
if a client somewhat active 60-80%
if a client is deconditioned 40-50%

*/


/* 
POSSIBLE HTML THAT MAYBE NEEDED TO PUT IN 
INPUTS FOR 
Effort
Age
Days
Minutes
APP needs to display Heart Rate range
*/
/* 

  // MODERATE INTENSITY
  // formula for intensity(220 - age * 0.4)
  // formula for intensity(220 - age * 0.6)
  // VIGOROUS INTENSITY
  // formula for intensity(220 - age * 0.6)
  // formula for intensity(220 - age * 0.9)
*/
