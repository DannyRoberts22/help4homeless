import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {RootStackParamList} from '@src/types/navigation-types';
import screenNames from '../../constants/screen-names';
import GeneralUserNavigator from './general-user-navigator';
import ShelterUserNavigator from './shelter-user-navigator';
import {theme} from '@src/theme';

const Stack = createStackNavigator<RootStackParamList>();
const MainNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        // headerTintColor: 'red',
        // headerStyle: {backgroundColor: theme.colors.primary},
        // HeaderStatusBarColor
      }}>
      <Stack.Screen
        name={screenNames.GENERAL_USER_NAVIGATOR}
        component={GeneralUserNavigator}
      />
      <Stack.Screen
        name={screenNames.SHELTER_USER_NAVIGATOR}
        component={ShelterUserNavigator}
      />
    </Stack.Navigator>
  );
};

export default MainNavigator;
