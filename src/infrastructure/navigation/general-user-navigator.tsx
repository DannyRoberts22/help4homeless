import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeScreen } from '@src/journeys/general-user/screens/home-screen';
import { QRScanScreen } from '@src/journeys/general-user/screens/qr-scan-screen';
import { MyDonationsScreen } from '@src/journeys/general-user/screens/my-donation-screen';
import { AboutScreen } from '@src/journeys/general-user/screens/about-screen';
import { NotificationScreen } from '@src/journeys/general-user/screens/notification-screen';
import screenNames from '@src/constants/screen-names';

const Tab = createBottomTabNavigator();

const GeneralUserNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name={screenNames.HOME_SCREEN} component={HomeScreen} />
      <Tab.Screen name={screenNames.QR_SCAN_SCREEN} component={QRScanScreen} />
      <Tab.Screen name={screenNames.MY_DONATION_SCREEN} component={MyDonationsScreen} />
      <Tab.Screen name={screenNames.NOTIFICATION_SCREEN} component={NotificationScreen} />
      <Tab.Screen name={screenNames.ABOUT_SCREEN} component={AboutScreen} />
    </Tab.Navigator>
  );
};

export default GeneralUserNavigator;