import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Flatlist } from 'react-native';
import { Slider } from '@miblanchard/react-native-slider';
import Goalrange from './goalrange';

export default function Tips() {
  const [sliderValue, setSliderValue] = useState(0)

  const glossaryTerms = [
    {
      term: 'Strength',
      def: 'Maximum amount of force muscles can generate.'
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

  //GETS VALUE FROM RANGE INPUT 
  const getInputValue = (value) => setSliderValue(value[0]);

  useEffect(() => {
    console.log(sliderValue)
  }, [sliderValue])

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tips</Text>

      <Text style={styles.title}>Glossary terms</Text>

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

      <Text style={styles.title}>Training Age</Text>
      <Text>
        {`Beginners: < 2 months`}
      </Text>
      <Text>
        {`Intermediate: 2 - 6 months`}
      </Text>
      <Text>
        {`Advanced: more than or equal to 1 year`}
      </Text>
      <Text style={styles.title}>Exercise frequency</Text>
      <Text>
        After exercising a muscle group (e.g. chest), it is recommended to wait 48 hours train the same muscle group again.
      </Text>

      <Text style={styles.title}>Optimal strength range</Text>
      <Text>
        Drag the dot to see how many repetitions, rest times between sets, and percentage is best for your goals.
      </Text>


      <View style={styles.chart}>
        <View style={[styles.category, sliderValue <= 67 ? styles.highlight : '']}>
          <Text style={[styles.categoryTxt,]}>Endurance</Text>
        </View>
        <View style={[styles.category, sliderValue >= 67 && sliderValue < 85 ? styles.highlight : '']}>
          <Text style={[styles.categoryTxt,]}>Hypertophy</Text>
        </View>
        <View style={[styles.category, sliderValue > 85 ? styles.highlight : '']}>
          <Text style={[styles.categoryTxt,]}>Strength</Text>
        </View>
      </View>

      <Text style={styles.percentage}>{`${sliderValue}%`}</Text>
      <View>
        <Goalrange sliderValue={sliderValue} />
        <Slider
          animateTransitions
          minimumTrackTintColor="#13a9d6"
          thumbTintColor="#0c6692"
          value={sliderValue}
          minimumValue={0}
          maximumValue={100}
          step={1}
          trackClickable={true}
          onValueChange={(value) => getInputValue(value)}
        />
      </View>

      {/* Need visual aid for breathing & eccentric muscle movement 3 seconds duration*/}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'stretch',
    justifyContent: 'flex-start',
    margin: 16,
    paddingBottom: 32,
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
    marginTop: 25,
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
  percentage: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 24,
  },
  chart: {
    flex: 1,
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
