import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Cardio from './cardio/cardio';
import Weights from './weights/weights';
import Calculator from './weights/calculator';
import Tips from './tips/tips';

export default function Wrapper({ mode }) {

  if (mode === 'cardio') return <Cardio />
  if (mode === 'weights') return <Weights />
  if (mode === 'calc') return <Calculator />
  if (mode === 'tips') return <Tips />
}

const styles = StyleSheet.create({
  app: {
    marginHorizontal: "auto",
    maxWidth: '31.25rem'
  },
});
