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
        <Text>Please press calc button if you haven't done so. It is needed to make your workout.</Text>
        <View style={styles.btnContainer}>
          <Text style={styles.cardioBtn}>
            <Button title="Returning users" onPress={() => setOption('returning user')} style={styles.btns} />
          </Text>
          <Text style={styles.weightsBtn}>
            <Button title="New time user" onPress={() => setOption('new user')} style={styles.btns} />
          </Text>
        </View>
      </View>
    );
  }

  if (option === 'returning user') return <ReturningUsers option={option} setOption={setOption} />

  if (option === 'new user') return <NewUser option={option} setOption={setOption} />

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
