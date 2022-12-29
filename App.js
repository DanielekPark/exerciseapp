import React, { useState } from 'react';
import { StyleSheet, View, ScrollView, AppRegistry } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Provider as PaperProvider, Appbar, Drawer, Button } from 'react-native-paper';
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
            {/* hamburger menu icon*/}
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

/* 
EXERCISE ICONS
https://www.gograph.com/vector-clip-art/exercise-stick-figure.html
*/

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