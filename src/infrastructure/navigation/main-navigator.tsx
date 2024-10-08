import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {RootStackParamList} from '@src/types/navigation-types';
import screenNames from '../../constants/screen-names';
import GeneralUserNavigator from './general-user-navigator';
import ShelterUserNavigator from './shelter-user-navigator';

const Stack = createStackNavigator<RootStackParamList>();

const MainNavigator = () => {
  const isGeneralUser = true;
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName={
        isGeneralUser
          ? screenNames.GENERAL_USER_NAVIGATOR
          : screenNames.SHELTER_USER_NAVIGATOR
      }>
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
