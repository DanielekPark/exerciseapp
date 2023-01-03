import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, Button } from 'react-native-paper';
import ReturningUsers from './returningUsers';
import NewUser from './newUser';

const btns = [
  {
    text: 'Yes',
    usedBefore: ' ',
    id: 0,
  },
  {
    text: 'No',
    usedBefore: ' ',
    id: 1
  },
];

export default function Weights() {
  const [buttons, setButtons] = useState(btns);

  //HIGHLIGHT BUTTON WHEN PRESSED
  const activeBtn = (btn) => {
    const active = buttons.map((item, index) => {
      if(btn.id === index){
        return {...item, usedBefore: 'Yes'};
      }else {
        return {...item, usedBefore: 'No'}
      }
    });
    setButtons(active);
  }

  return (
    <View>
      <Text variant="headlineSmall" style={styles.txtCenter}>Weight Lifting</Text>
      <View style={styles.btnContainer}>
        <Text style={styles.daysTxt}>Have you used this app before? </Text>
        {buttons.map((btn) => {
          return (
            <Button
              key={btn.text + 'buttonKey'}
              mode={btn.usedBefore === 'Yes' ? 'contained' : 'outlined'}
              onPress={() => activeBtn(btn)}
              style={btn.id === 1 ? styles.rightBtn : {}}
            >
              {btn.text}
            </Button>
          )
        })}
      </View>

      {buttons[0].usedBefore === 'Yes' ?
        <View>
          <NewUser />
        </View>
        :
        ''
      }

      {buttons[1].usedBefore === 'Yes' ?
        <View>
          <ReturningUsers />
        </View>
        : 
        ''
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
  }, 
  daysTxt: {
    marginTop: 'auto',
    marginBottom: 'auto'
  },  
  rightBtn: {
    marginLeft: 5
  },  
});
