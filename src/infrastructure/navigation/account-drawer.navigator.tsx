import React from 'react';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import screenNames from '@src/constants/screen-names';
import MainNavigator from './main-navigator';

import {ProfileScreen} from '@src/journeys/shared/screens/profile-screen';
import {AccountDrawerContent} from '@src/components/organisms/account-drawer-content/AccountDrawerContent';
import {theme} from '@src/theme';
import {useAppDispatch} from '@src/hooks/redux/reduxHooks';
import {firebaseSignOut} from '@src/services/authServices';
import {logoutUser} from '@src/store/redux/slices/userSlice';
import {Alert, Dimensions} from 'react-native';

const Drawer = createDrawerNavigator();

import {DrawerContentComponentProps} from '@react-navigation/drawer';

function CustomDrawerContent(props: DrawerContentComponentProps) {
  const dispatch = useAppDispatch();

  const handleSignOut = () => {
    dispatch(logoutUser());
    firebaseSignOut()
      .then(() => {
        props.navigation.reset({
          index: 0,
          routes: [{name: screenNames.AUTH_NAVIGATOR}], // Replace with your auth navigator screen
        });
      })
      .catch(error => {
        console.log('Error signing out:', error);
        Alert.alert('Error', 'Failed to sign out. Please try again.');
      });
  };

  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <AccountDrawerContent handleSignOut={handleSignOut} />
    </DrawerContentScrollView>
  );
}

export const AccountDrawerNavigator = () => {
  return (
    <Drawer.Navigator
      initialRouteName={screenNames.MAIN_NAVIGATOR}
      drawerContent={props => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          backgroundColor: theme.colors.primary,
          width: Dimensions.get('window').width * 0.8,
        },
        drawerItemStyle: {
          backgroundColor: '#9dd3c8',
          borderColor: 'black',
          opacity: 0.8,
        },
        drawerActiveTintColor: 'white',
        drawerInactiveTintColor: 'white',
      }}>
      <Drawer.Screen
        name={screenNames.MAIN_NAVIGATOR}
        component={MainNavigator}
      />
      <Drawer.Screen
        name={screenNames.PROFILE_SCREEN}
        component={ProfileScreen}
      />
    </Drawer.Navigator>
  );
};
