import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native';
import { Stack, Button, TextInput, } from "@react-native-material/core";
import exercises from './exercises';

export default function ReturningUsers({ option, setOption }) {
  const [userData, setUserData] = useState({ exercises: exercises, selected: [], updateExer: false, goal: '' });
  //option, setOption use later for starting over button

  //SELECT EXERCISES TO USE
  const chooseExer = (name) => {
    const selected = userData.exercises.map((item) => {
      if (item.name === name) {
        return {
          ...item,
          chosen: !item.chosen
        }
      }
      return { ...item };
    })
    setUserData({ ...userData, exercises: selected })
  }

  //SELECTS EXERCISES TO UPDATE
  const preparePlan = () => {
    //CHECKS IF EXERCISES HAVE BEEN SELECTED
    const checkSelected = userData.exercises.some((item) => item.chosen === true);
    if (!checkSelected) return;

    const exercises = userData.exercises.filter((item) => item.chosen === true);
    setUserData({ ...userData, selected: exercises, updateExer: true });
  }

  // useEffect(() => {
  //   console.log(userData.selected)
  // }, [userData])

  return (
    <View>
      <View style={styles.btnContainer}>
        <Text style={styles.weightsBtn}>
          <Button title="New time user" style={styles.btns} />
        </Text>
        <Text style={styles.cardioBtn}>
          <Button title="Returning users" style={styles.btns} />
        </Text>
      </View>
      {/* ASK TRAINING AGE */}
      <Text style={styles.title}>Questions</Text>

      <View>
        <View>
          <View>
            <Text>Number of consecutive workout weeks</Text>
            <TextInput keyboardType="numeric" style={{ margin: 16 }} maxLength={2} label="e.g. 1" />
            <View>
              <Text>Select exercises from a previous workout day</Text>
              <View style={styles.container}>
                {
                  userData.updateExer ?
                    userData.selected.map((item) => {
                      return (
                        <TouchableOpacity key={item.name} style={[styles.item, item.chosen ? styles.selected : '']}>
                          <Text style={styles.itemTitle}>
                            {item.name}
                          </Text>
                          <TextInput keyboardType="numeric" style={{ margin: 16 }} maxLength={2} label="e.g. 1" />
                        </TouchableOpacity>
                      )
                    })
                    :
                    <View>
                      {/* PROVIDE DATA TO CREATE NEW PLAN */}
                      {userData.exercises.map((item) => {
                        return (
                          <TouchableOpacity key={item.name} style={[styles.item, item.chosen ? styles.selected : '']} onPress={() => chooseExer(item.name)}>
                            <Text style={styles.itemTitle}>
                              {item.name}
                            </Text>
                          </TouchableOpacity>
                        )
                      })}
                    </View>
                }
              </View>
            </View>
          </View>
          <View>
            {userData.updateExer ?
              <Button title="Update" />
              :
              <Button title="Enter" onPress={preparePlan} />
            }
          </View>
          <View>

          </View>
        </View>
      </View>
    </View>
  );
}

/* 
EXERCISE ICONS
https://www.gograph.com/vector-clip-art/exercise-stick-figure.html


BEGINNER
SETS 1-2
REPS 8-12
2-3 PER WEEK
INTENSITY 60-80%

*/

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
    marginBottom: 30
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
  item: {
    width: Dimensions.get('window').width * 0.5,
    height: 100,
    width: 100,
    borderWidth: 1,
    borderColor: "lightgray",
    alignItems: 'center',
    justifyContent: 'center'
  },
  itemTitle: {
    marginTop: 16,
  },
  selected: {
    backgroundColor: '#98FB98'
  }
});
