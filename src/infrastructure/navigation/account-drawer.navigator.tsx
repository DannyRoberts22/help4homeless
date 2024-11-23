import React from 'react';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
} from '@react-navigation/drawer';
import screenNames from '@src/constants/screen-names';
import MainNavigator from './main-navigator';
import {View, Button} from 'react-native';
import {firebaseSignOut} from '@src/services/authServices';
import {logoutUser} from '@src/store/redux/slices/userSlice';
import {useAppDispatch} from '@src/hooks/redux/reduxHooks';
const Drawer = createDrawerNavigator();

// Custom Drawer Content
import {DrawerContentComponentProps} from '@react-navigation/drawer';
import {ProfileScreen} from '@src/journeys/shared/screens/profile-screen';

interface CustomDrawerContentProps extends DrawerContentComponentProps {}

function CustomDrawerContent(props: CustomDrawerContentProps) {
  const dispatch = useAppDispatch();
  const handleSignOut = () => {
    // Firebase sign out
    dispatch(logoutUser());
    firebaseSignOut()
      .then(() => {
        props.navigation.reset({
          index: 0,
          routes: [{name: screenNames.AUTH_NAVIGATOR}],
        });
      })
      .catch(error => {
        console.log('Error signing out:', error);
      });
  };

  return (
    <DrawerContentScrollView {...props}>
      {/* Default Drawer Items */}
      <DrawerItem
        label="Home"
        onPress={() => props.navigation.navigate(screenNames.MAIN_NAVIGATOR)}
      />
      <DrawerItem
        label="Profile"
        onPress={() => props.navigation.navigate(screenNames.PROFILE_SCREEN)} // Account Screen
      />
      <View style={{marginTop: 20, marginHorizontal: 10}}>
        <Button title="Sign Out" color="red" onPress={handleSignOut} />
      </View>
    </DrawerContentScrollView>
  );
}

export const AccountDrawerNavigator = () => {
  return (
    <Drawer.Navigator
      initialRouteName={screenNames.MAIN_NAVIGATOR}
      // drawerContent={props => <DrawerContent {...props} />}
      drawerContent={props => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
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
