import { createStackNavigator } from '@react-navigation/stack';
import React from 'react'
import { RootStackParamList } from '../../types/navigation';
import screenNames from '../../constants/screen-names';
import { TestScreen } from '../../journeys/test/test-screen';
import { TestScreenTwo } from '../../journeys/test/test-screen-two';

const Stack = createStackNavigator<RootStackParamList>();
const TestStack = () => {
  return (
   <Stack.Navigator screenOptions={{headerShown: false}}>
    <Stack.Screen name={screenNames.TEST_SCREEN} component={TestScreen}/>
    <Stack.Screen name={screenNames.TEST_SCREEN_TWO} component={TestScreenTwo}/>
   </Stack.Navigator>
  )
}

export default TestStack