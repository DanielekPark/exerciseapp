import React, { useState } from 'react';
import { StyleSheet, View, ScrollView, AppRegistry } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Provider as PaperProvider, Appbar, Drawer } from 'react-native-paper';
import Wrapper from './components/wrapper';
import { name as appName } from './app.json';

export default function App() {
  const [mode, setMode] = useState('weights');

  return (
    <PaperProvider>
      <ScrollView>
        <View style={styles.app}>
          <View style={styles.header}>
            <Appbar.Header>
              <Appbar.Content title="Exercise App" />
            </Appbar.Header>
            <Drawer.Section showDivider={false}>
              <Drawer.Item
                label="Weights"
                active={mode === 'weights'}
                onPress={() => setMode('weights')}
              />
              <Drawer.Item
                label="Calculator"
                active={mode === 'calc'}
                onPress={() => setMode('calc')}
              />
              <Drawer.Item
                label="Tips"
                active={mode === 'tips'}
                onPress={() => setMode('tips')}
              />
            </Drawer.Section>
            <Wrapper mode={mode} />
            <StatusBar style="auto" />
          </View>
        </View>
      </ScrollView>
    </PaperProvider>
  );
}

AppRegistry.registerComponent(appName, () => App);

const styles = StyleSheet.create({
  app: {
    marginHorizontal: "auto",
    maxWidth: 500
  },
  header: {
    padding: 20
  },
});

/*
EXERCISE ICONS
https://www.gograph.com/vector-clip-art/exercise-stick-figure.html
*/

//https://www.nfpt.com/blog/calculating-a-clients-1rm#:~:text=This%20formula%20states%20that%20an,performed%20for%20the%20given%20exercise.
/* This formula states that an individual’s 1RM = w ÷ [(1.0278) – (0.0278 x r)]. The w represents the weight, in pounds, lifted for 10 successful repetitions. The r stands for the number of repetitions performed for the given exercise. */

/* 
  acsm pg 350
  nsca pg 390
  beginner 8 - 12 reps, 2-3 sets, 60 - 80%
*/

/* 
OTHER FEATURES:
work on questionaire later 
CREATE A BUTTON & COMPONENT FOR WALKTHOUGH GIVE IT A DIFFERENT NAME
stretching visual aid guide
*/