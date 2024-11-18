// App.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginAndSignupScreen from './src/screens/LoginAndSignupScreen';
import HomeScreen from './src/screens/HomeScreen';
import RobotControl from './src/screens/RobotControl';
import { RootStackParamList } from './src/types/navigation';
import ManageCrops from './src/screens/ManageCrops';
import ManagePests from './src/screens/ManagePests';
const Stack = createStackNavigator<RootStackParamList>();

const App = () => (
  <NavigationContainer>
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" component={LoginAndSignupScreen} />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="ManageCrops" component={ManageCrops} />
      <Stack.Screen name="ManagePests" component={ManagePests} />
      <Stack.Screen name="RobotController" component={RobotControl} />
    </Stack.Navigator>
  </NavigationContainer>
);

export default App;
