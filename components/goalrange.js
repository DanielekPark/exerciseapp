import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Flatlist } from 'react-native';

export default function Goalrange({ sliderValue }) {
  const restReps = sliderValue / 1

  if (restReps <= 67) {
    return (
      <>
        <Text>Repetitions: 12-20</Text>
        <Text>Rest time: 30 seconds or less</Text>
      </>
    )
  }

  if (restReps >= 67 && restReps < 85) {
    return (
      <>
        <Text>Repetitions: 8-12</Text>
        <Text>Rest time: 1-2 minutes</Text>
      </>
    )
  }
  if (restReps >= 85) {
    return (
      <>
        <Text>Repetitions: 8-12</Text>
        <Text>Rest time: 2-3 minutes</Text>
      </>
    )
  }
}
