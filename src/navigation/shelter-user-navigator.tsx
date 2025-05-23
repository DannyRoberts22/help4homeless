import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';

import screenNames from '@src/constants/screen-names';
import { ProfileScreen } from '@src/journeys/shared/screens/profile-screen';
import { DashboardScreen } from '@src/journeys/shelter/screens/dashboard-screen';
import { ManageScreen } from '@src/journeys/shelter/screens/manage-screen';
import { theme } from '@src/theme';
import { getMappedIcons } from '@src/utils/getMappedIcons';
import { isIpad } from '@src/constants/constants';

const Tab = createBottomTabNavigator();

const ShelterUserNavigator = () => {
  const getTabBarScreenOptions = (route: {
    route: { name: string };
  }): BottomTabNavigationOptions => {
    const { iconName, size, color, title } = getMappedIcons(route);
    return {
      headerShown: false,
      title: title,
      tabBarIcon: () => <Icon name={iconName} size={size} color={color} />,
      tabBarStyle: {
        backgroundColor: theme.colors.primary,
      },
      tabBarActiveTintColor: theme.colors.white,
      tabBarInactiveTintColor: theme.colors.softWhite,
      tabBarLabelStyle: { fontSize: isIpad ? 18 : 12, fontWeight: 'bold' },
    };
  };

  return (
    <Tab.Navigator
      screenOptions={getTabBarScreenOptions}
      initialRouteName={screenNames.DASHBOARD_SCREEN}
    >
      <Tab.Screen
        name={screenNames.DASHBOARD_SCREEN}
        component={DashboardScreen}
      />
      {/* TODO remove this <Tab.Screen name={screenNames.MANAGE_SCREEN} component={ManageScreen} /> */}
      <Tab.Screen name={screenNames.PROFILE_SCREEN} component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default ShelterUserNavigator;
