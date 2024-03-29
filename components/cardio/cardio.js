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
  }

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
