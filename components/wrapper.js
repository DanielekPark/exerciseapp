import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Stack, Button } from "@react-native-material/core";
import Cardio from './cardio/cardio';
import Weights from './weights/weights';
import Calculator from './weights/calculator';
import Tips from './tips';

export default function Wrapper({ mode }) {

  if (mode === 'cardio') return <Cardio />
  if (mode === 'weights') return <Weights />
  if (mode === 'calculator') return <Calculator />
  if (mode === 'tips') return <Tips />
}

const styles = StyleSheet.create({
  app: {
    marginHorizontal: "auto",
    maxWidth: 500
  },
});
