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