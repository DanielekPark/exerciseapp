import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, Button, DataTable } from 'react-native-paper';
import exercises from './exercises';
import Schedule from './Schedule';

export default function NewUser() {
  const [userData, setUserData] = useState({ exercises: exercises, list: [], plan: [], days: 0, level: '', category: '', showInputs: false, showPlan: false, goals: '' });

  return (
    <View style={styles.headSpacing}>
      <Text variant="headlineSmall" style={styles.txtCenter}>
        Create your workout
      </Text>
      <View style={styles.days}>
        <View style={styles.daysTxt}>
          <Text variant="titleSmall">Availablility per week ?</Text>
        </View>

        {/* BUTTON HIGHLIGHTS WHEN PRESSED */}
        <View style={styles.btnContainer}>
          <Button
            onPress={() => setUserData({ ...userData, days: 2 })}
            mode={userData.days === 2 ? 'contained' : 'outlined'}>
            2
          </Button>
          <Button
            style={styles.rightBtn}
            onPress={() => setUserData({ ...userData, days: 3 })}
            mode={userData.days === 3 ? 'contained' : 'outlined'}>
            3
          </Button>
        </View>
      </View>

      <View>
        <View style={styles.days}>
          <View style={styles.daysTxt}>
            <Text variant="titleSmall">Are you a beginner?</Text>
          </View>

          <View style={styles.experience}>
            <Button
              onPress={() => setUserData({ ...userData, level: 'beginner' })}
              mode={userData.level === 'beginner' ? 'contained' : 'outlined'}>
              Yes
            </Button>
            <Button
              style={styles.rightBtn}
              onPress={() => setUserData({ ...userData, level: 'intermediate' })}
              mode={userData.level === 'intermediate' ? 'contained' : 'outlined'}>
              No
            </Button>
          </View>
        </View>
      </View>

      <View>
        <View style={styles.days}>
          <View style={styles.textContain}>
            <Text variant="titleSmall">Exercise goals ?</Text>
          </View>

          <View style={styles.wrapper}>
            <Button
              onPress={() => setUserData({ ...userData, goals: 'muscleSize' })}
              mode={userData.goals === 'muscleSize' ? 'contained' : 'outlined'}>
              Gain muscle
            </Button>
            <Button
              style={styles.rightBtn}
              onPress={() => setUserData({ ...userData, goals: 'stronger' })}
              mode={userData.goals === 'stronger' ? 'contained' : 'outlined'}>
              Get Stronger
            </Button>
          </View>
        </View>
      </View>

      {userData.days > 1 && userData.level && userData.goals ?
        <View>
          <Schedule
            userData={userData}
            setUserData={setUserData} />
        </View>
        :
        ""
      }
    </View>
  );
}

const styles = StyleSheet.create({
  headSpacing: {
    marginTop: 30,
  },
  days: {
    marginTop: 30,
    marginBottom: 30,
    flexDirection: 'row',
  },
  txtCenter: {
    textAlign: 'center',
  },
  daysTxt: {
    marginTop: 'auto',
    marginBottom: 'auto'
  },
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 'auto',
  },
  textContain: {
    flex: 2
  },
  wrapper: {
    flexDirection: 'row',
  },  
  experience: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 'auto'
  },
  rightBtn: {
    marginLeft: 5
  },
});