import { createStackNavigator } from '@react-navigation/stack';
import React from 'react'
import { RootStackParamList } from '../../types/navigation';
import { TabNavigator } from './tab-navigator';
import TestStack from './test-stack';
import screenNames from '../../constants/screen-names';

const Stack = createStackNavigator<RootStackParamList>();
const MainNavigator = () => {
  return (
    <Stack.Navigator >
        <Stack.Screen name={screenNames.TAB_NAVIGATOR} component={TabNavigator} />
        <Stack.Screen name={screenNames.TEST_NAVIGATOR} component={TestStack} />
    </Stack.Navigator>
  )
}

export default MainNavigator