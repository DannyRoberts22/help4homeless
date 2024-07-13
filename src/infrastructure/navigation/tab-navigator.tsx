import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {HomeScreen} from '../../journeys/home/screens/home-screen';
import {AccountScreen} from '../../journeys/account/screens/account-screen';
import screenNames from 'constants/screen-names';
import { RootStackParamList } from 'types/navigation';
import AccountNavigator from 'journeys/account/account-navigator';

const Tab = createBottomTabNavigator<RootStackParamList>();

export const TabNavigator = () => {
  return (
    <Tab.Navigator initialRouteName={screenNames.HOME_SCREEN}>
      <Tab.Screen name={screenNames.HOME_SCREEN} component={HomeScreen} />
      <Tab.Screen name={screenNames.ACCOUNT_NAVIGATOR} component={AccountNavigator} />
    </Tab.Navigator>
  );
};
