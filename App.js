import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { Stack, Button } from "@react-native-material/core";
import Wrapper from './components/wrapper';
import Calculator from './components/weights/calculator';

export default function App() {
  const [mode, setMode] = useState('weights');

  return (
    <ScrollView>
      <View style={styles.app}>
        <View style={styles.header}>
          <Text style={styles.title}>Exercise App</Text>
          {/* for buttons useState to show if button is active*/}
          <View style={styles.btnContainer}>
            {/* <Text style={styles.cardioBtn}>
              <Button title="Cardio" style={styles.btns} onPress={() => setMode('cardio')} />
            </Text> */}
            <Text style={styles.weightsBtn}>
              <Button title="Weights" style={styles.btns} onPress={() => setMode('weights')} />
            </Text>
            <Text style={styles.calcBtn}>
              <Button title="Calc" style={styles.btns} onPress={() => setMode('calculator')} />
            </Text>
            <Text style={styles.calcBtn}>
              <Button title="Tips" style={styles.btns} onPress={() => setMode('tips')} />
            </Text>
            {/* <Text style={styles.calcBtn}>
              <Button title="Stretch" style={styles.btns} onPress={() => setMode('stretch')} />
            </Text> */}
          </View>
          <Wrapper mode={mode} />
          <StatusBar style="auto" />
        </View>
      </View>
    </ScrollView>
  );
}

// OTHER FEATURES:
// work on questionaire later
// CREATE A BUTTON & COMPONENT FOR WALKTHOUGH GIVE IT A DIFFERENT NAME
//stretching visual aid guide


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
    width: "20%",
  },
  btnContainer: {
    flexDirection: 'row', flexWrap: 'wrap', marginRight: 'auto', marginLeft: 'auto', marginTop: 30
  },
  cardioBtn: {
    marginRight: 3,
  },
  weightsBtn: {
    marginLeft: 3,
  },
  calcBtn: {
    marginLeft: 3,
  },
});