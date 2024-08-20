import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './src/screens/HomeScreen';
import MilesScreen from './src/screens/MilesScreen';
import CaloriesScreen from './src/screens/CaloriesScreen';
import StepsScreen from './src/screens/StepsScreen';

const Stack = createStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Miles" component={MilesScreen} />
        <Stack.Screen name="Calories" component={CaloriesScreen} />
        <Stack.Screen name="Steps" component={StepsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
