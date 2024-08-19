import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const CaloriesScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Calories Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CaloriesScreen;
