import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Flatlist } from 'react-native';

export default function Tips() {

  // use flatlist 
  // https://www.atomlab.dev/tutorials/react-native-bullet-list

  const glossaryTerms = [
    {
      term: 'Strength',
      def: 'Maximal amount of force muscles can generate.'
    },
    {
      term: 'Hypertrophy',
      def: 'Increase in muscle size'
    },
    {
      term: 'Muscular endurance',
      def: 'Ability to sustain repeated effort over a period of time.'
    },
  ]

  return (
    <View>
      <Text style={styles.title}>Tips</Text>

      <Text style={styles.title}>Glossary terms</Text>
      {/* Provide glossary terms */}
      {/* Hypertrophy, endurance, strength */}
      <View>
        {glossaryTerms.map((item) => {
          return (
            <View key={item.term} style={{ marginBottom: 10, marginTop: 5 }}>
              <Text>
                {`\u2022 ${item.term} ${item.def}`}
              </Text>
            </View>
          )
        })}
      </View>

      <Text style={styles.title}>Exercise frequency</Text>
      <Text>
        After exercising a muscle group (e.g. chest), it is recommended to wait 48 hours train the same muscle group again.
      </Text>
      {/* add a range input to show optimal ranges for endurance, hypertrophy, strength
      show percentage range,reps, & rest times of each optimal fitness goal
      https://github.com/miblanchard/react-native-slider
      */}
      <Text style={styles.title}>Optimal strength range</Text>
      <Text>
        Drag the dot to how many repetitions, rest times between sets, and percentage is best for your goal.
      </Text>
      {/* Need visual aid for breathing & eccentric muscle movement 3 seconds duration*/}
    </View>
  );
}


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
