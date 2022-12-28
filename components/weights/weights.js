import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, Button } from 'react-native-paper';
import ReturningUsers from './returningUsers';
import NewUser from './newUser';

const btns = [
  {
    level: 'New User',
    selected: true
  },
  {
    level: 'Returning User',
    selected: false
  }
];

export default function Weights() {
  const [buttons, setButtons] = useState(btns);

  //HIGHLIGHT BUTTON WHEN PRESSED
  const activeBtn = (btn, level) => {
    const active = buttons.map((item) => {
      if (btn.level === level) {
        return { ...item, selected: !item.selected };
      }
      return item;
    });
    setButtons(active);
  }

  return (
    <View>
      <Text variant="headlineSmall" style={styles.txtCenter}>Weight Lifting</Text>
      <View style={styles.btnContainer}>
        {buttons.map((btn) => {
          return (
            <Button
              key={btn.level + 'buttonKey'}
              mode={btn.selected ? 'contained' : 'outlined'}
              onPress={() => activeBtn(btn, btn.level)}
            >
              {btn.level}
            </Button>
          )
        })}
      </View>
      {buttons[0].selected ?
        <View>
          <NewUser />
        </View>
        :
        <View>
          <ReturningUsers />
        </View>
      }
    </View>
  );
}

const styles = StyleSheet.create({
  txtCenter: {
    textAlign: 'center'
  },
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 20,
  }
});
