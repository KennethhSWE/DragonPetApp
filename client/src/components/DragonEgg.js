import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

const DragonEgg = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/art/dragon-egg-white.png')} // Ensure this is the correct transparent PNG
        style={styles.image}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: 'transparent', // Make the container background transparent
  },
  image: {
    width: 200 ,
    height: 200 ,
    resizeMode: 'contain',
  
  },
});

export default DragonEgg;
