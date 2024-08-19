import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import App from '../App';
import MilesScreen from './screens/MilesScreen';
import CaloriesScreen from './screens/CaloriesScreen';
import StepsScreen from './screens/StepsScreen';

const Stack = createStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={App} />
        <Stack.Screen name="Miles" component={MilesScreen} />
        <Stack.Screen name="Calories" component={CaloriesScreen} />
        <Stack.Screen name="Steps" component={StepsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
