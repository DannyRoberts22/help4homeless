import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {HomeScreen} from '@src/journeys/general-user/screens/home-screen';
import {QRScanScreen} from '@src/journeys/general-user/screens/qr-scan-screen';
import {MyDonationsScreen} from '@src/journeys/general-user/screens/my-donation-screen';
import {AboutScreen} from '@src/journeys/general-user/screens/about-screen';
import {NotificationScreen} from '@src/journeys/general-user/screens/notification-screen';
import screenNames from '@src/constants/screen-names';
import Icon from 'react-native-vector-icons/FontAwesome';
import {getMappedIcons} from '@src/utils/getMappedIcons';
import {theme} from '@src/theme';

const Tab = createBottomTabNavigator();

const GeneralUserNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={(route: {route: {name: string}}) => {
        const {iconName, size, color, title} = getMappedIcons(route);
        return {
          headerShown: false,
          title: title,
          tabBarIcon: () => <Icon name={iconName} size={size} color={color} />,
          tabBarStyle: {
            backgroundColor: theme.colors.primary,
          },
          tabBarActiveTintColor: theme.colors.white,
          tabBarLabelStyle: {fontSize: 12},
        };
      }}>
      <Tab.Screen name={screenNames.HOME_SCREEN} component={HomeScreen} />
      <Tab.Screen name={screenNames.QR_SCAN_SCREEN} component={QRScanScreen} />
      <Tab.Screen
        name={screenNames.MY_DONATION_SCREEN}
        component={MyDonationsScreen}
      />
      <Tab.Screen
        name={screenNames.NOTIFICATION_SCREEN}
        component={NotificationScreen}
      />
      <Tab.Screen name={screenNames.ABOUT_SCREEN} component={AboutScreen} />
    </Tab.Navigator>
  );
};

export default GeneralUserNavigator;
