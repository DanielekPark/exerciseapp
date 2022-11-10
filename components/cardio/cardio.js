import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Stack, Button } from "@react-native-material/core";

export default function Weights() {

  return (
    <View>
      <Text style={styles.title}>Cardio Training</Text>
    </View>
  );
}

/* 
cardio 5-15 min warm up,
Light warm up < 57% of HR max
Light warm up 57-64% of HR max
Moderate intensity warm up 64-76% of HR max

Levels of cardio intensity
150 min moderate effort (40-60%) 5 days per week
90 min vigorous effort (60-90%) 3 days per week

MODERATE INTENSITY
formula for intensity (220 - age * 0.4)
formula for intensity (220 - age * 0.6)
VIGOROUS INTENSITY
formula for intensity (220 - age * 0.6)
formula for intensity (220 - age * 0.9)
POSSIBLE HTML THAT MAYBE NEEDED TO PUT IN 
INPUTS FOR 
Effort
Age
Days
Minutes
APP needs to display Heart Rate range
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
    flexDirection: 'row', flexWrap: 'wrap', marginRight: 'auto', marginLeft: 'auto', marginTop: 30
  },
  cardioBtn: {
    marginRight: 5,
  },
  weightsBtn: {
    marginLeft: 5,
  },
});
