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
import {firebaseSignOut} from '@src/api/auth-services';
import {logoutUser} from '@src/store/redux/slices/userSlice';
import {Alert, Dimensions, Text} from 'react-native';

const Drawer = createDrawerNavigator();

import {DrawerContentComponentProps} from '@react-navigation/drawer';

const CustomLabel = ({label}: {label: string}) => {
  return (
    <Text
      style={{color: theme.colors.primary, fontSize: 16, fontWeight: 'bold'}}>
      {label}
    </Text>
  );
};

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
          backgroundColor: 'white',
          borderColor: 'black',
          opacity: 0.8,
        },
      }}>
      <Drawer.Screen
        name={screenNames.MAIN_NAVIGATOR}
        component={MainNavigator}
        options={{
          drawerLabel: () => <CustomLabel label="Home" />,
        }}
      />
      <Drawer.Screen
        name={screenNames.PROFILE_SCREEN}
        component={ProfileScreen}
        options={{
          drawerLabel: () => <CustomLabel label="Profile" />,
        }}
      />
    </Drawer.Navigator>
  );
};
