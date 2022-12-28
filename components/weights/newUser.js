import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, Button } from 'react-native-paper';
import exercises from './exercises';
import Schedule from './Schedule';

export default function NewUser() {
  const [userData, setUserData] = useState({ exercises: exercises, list: [], plan: [], days: 0, level: '', category: '', showPlan: false, goals: '' });

  return (
    <View style={styles.headSpacing}>
      <Text variant="headlineSmall" style={styles.txtCenter}>
        Create your workout
      </Text>
      <View style={styles.days}>
        <View style={styles.daysTxt}>
          <Text>Days available per week ?</Text>
        </View>

        {/* BUTTONS ARE HIGHLIGHTED WHEN PRESSED */}
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
            <Text>Experience level? </Text>
          </View>

          <View style={styles.experience}>
            <Button
              onPress={() => setUserData({ ...userData, level: 'beginner' })}
              mode={userData.level === 'beginner' ? 'contained' : 'outlined'}>
              Beginner
            </Button>
            <Button
              style={styles.rightBtn}
              onPress={() => setUserData({ ...userData, level: 'intermediate' })}
              mode={userData.level === 'intermediate' ? 'contained' : 'outlined'}>
              Intermediate
            </Button>
          </View>
        </View>
      </View>

      <View>
        <View style={styles.days}>
          <View style={styles.daysTxt}>
            <Text>Goals ?</Text>
          </View>

          <View style={styles.btnContainer}>
            <Button
              onPress={() => setUserData({ ...userData, goals: 'get bigger' })}
              mode={userData.goals === 'get bigger' ? 'contained' : 'outlined'}>
              Get Bigger
            </Button>
            <Button
              style={styles.rightBtn}
              onPress={() => setUserData({ ...userData, goals: 'stronger' })}
              mode={userData.goals === 'stronger' ? 'contained' : 'outlined'}>
              Stronger
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
  experience: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rightBtn: {
    marginLeft: 5
  },
});