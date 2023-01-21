import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, Title } from 'react-native-paper';
import Goalrange from './goalrange';

export default function Tips() {
  const [sliderValue, setSliderValue] = useState(0);

  const glossaryTerms = [
    {
      term: 'Strength',
      def: 'maximum amount of force muscles can generate.'
    },
    {
      term: 'Hypertrophy',
      def: 'increase in muscle size.'
    },
    {
      term: 'Muscular endurance',
      def: 'ability to perform repeated movements and resisting fatigue.'
    },
  ];

  //GETS VALUE FROM RANGE INPUT 
  const getInputValue = (value) => setSliderValue(value[0]);

  return (
    <View>
      <View>
        <Text variant="headlineMedium" style={[styles.txtCenter, styles.title]}>Tips</Text>
        <Text variant="headlineSmall" style={styles.title}>Glossary terms</Text>
        <View>
          {glossaryTerms.map((item) => {
            return (
              <View style={styles.term} key={`${item.term}term`}>
                <Text variant="titleMedium" style={styles.term}>
                  {`\u2022 ${item.term}: ${item.def}`}
                </Text>
              </View>
            )
          })}
        </View>

        <Text variant="headlineSmall" style={styles.subHeading}>Training Age</Text>
        <Text variant="titleMedium" style={styles.term}>
          {`\u2022 Beginners: less than 2 months`}
        </Text>
        <Text variant="titleMedium" style={styles.term}>
          {`\u2022 Intermediate: 2 - 6 months`}
        </Text>
        <Text variant="titleMedium" style={styles.term}>
          {`\u2022 Advanced: more than or equal to 1 year`}
        </Text>

        <Text variant="headlineSmall" style={styles.subHeading}>Exercise frequency</Text>
        <Text variant="titleMedium" style={styles.term}>
          After exercising a muscle group (e.g. chest, back), wait a minimum 48 hours train the same muscle group again.
        </Text>
          {/* strength range needs work */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    marginTop: 10,
  },
  subHeading: {
    marginTop: 15,
  },
  txtCenter: {
    textAlign: 'center'
  },
  term: {
    flexDirection: 'row',
    marginTop: 3,
    marginBottom: 3,
  },
  container: {
    alignItems: 'stretch',
    justifyContent: 'flex-start',
    margin: 16,
    paddingBottom: 32,
  },
  percentage: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 24,
  },
  chart: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginRight: 'auto',
    marginLeft: 'auto',
    marginTop: 30,
    marginBottom: 10,
    justifyContent: 'space-between'
  },
  category: {
    width: '33.33%'
  },
  categoryTxt: {
    textAlign: 'center',
    fontWeight: "semibold",
    fontSize: 18,
  },
  strength: {},
  hypertophy: {},
  endurance: {},
  highlight: {
    backgroundColor: "yellow"
  }
});
