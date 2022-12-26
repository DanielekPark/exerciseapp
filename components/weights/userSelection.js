import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Stack, Button } from "@react-native-material/core";
import ReturningUsers from './returningUsers';
import NewUser from './newUser';

export default function UserSelection() {
  const [option, setOption] = useState('buttons')

  if (option === 'buttons') {
    return (
      <View>
        <Text>Please choose 3 exercises and use the calc button to determine the right weight.</Text>

        <View style={styles.btnContainer}>
          {/* <Text style={styles.cardioBtn}>
            <Button title="Returning users" onPress={() => setOption('returning user')} style={styles.btns} />
          </Text>*/}
          <Text style={styles.weightsBtn}>
            <Button title="New user" onPress={() => setOption('new user')} style={styles.btns} />
            <Button title="Prev user" onPress={() => setOption('returning user')} style={styles.btns} />
          </Text>
        </View>
      </View>
    );
  }

  if (option === 'new user') {
    return (
      <View>
        <Text>Weight Lifting</Text>
        <NewUser option={option} setOption={setOption} />
      </View>
    )
  }

  if (option === 'returning user') {
    return (
      <View>
        <Text>Weight Lifting</Text>
        <ReturningUsers option={option} setOption={setOption} />
      </View>
    )
  }

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
});
