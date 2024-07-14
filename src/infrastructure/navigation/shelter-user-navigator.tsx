import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { DashboardScreen } from '@src/journeys/shelter/screens/dashboard-screen';
import { ManageScreen } from '@src/journeys/shelter/screens/manage-screen';
import { ProfileScreen } from '@src/journeys/shelter/screens/profile-screen';
import screenNames from '../../constants/screen-names';

const Tab = createBottomTabNavigator();

const ShelterUserNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name={screenNames.DASHBOARD_SCREEN} component={DashboardScreen} />
      <Tab.Screen name={screenNames.MANAGE_SCREEN} component={ManageScreen} />
      <Tab.Screen name={screenNames.PROFILE_SCREEN} component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default ShelterUserNavigator;