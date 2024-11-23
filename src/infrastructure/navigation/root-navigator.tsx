import * as React from 'react';
import {NavigationContainer, DrawerActions} from '@react-navigation/native';
import AuthNavigator from './auth-navigator';
import {createStackNavigator} from '@react-navigation/stack';
import screenNames from '@src/constants/screen-names';
import {useAppSelector} from '@src/hooks/redux/reduxHooks';
import {AccountDrawerNavigator} from './account-drawer.navigator';
import ScreenHeader from '@src/components/utility/screen-header/ScreenHeader';
import {createNavigationContainerRef} from '@react-navigation/native';
const Stack = createStackNavigator();

export const navigationRef = createNavigationContainerRef();

export const Navigation = () => {
  React.useEffect(() => {
    if (navigationRef.current) {
      console.log('Current navigation ref:', navigationRef.current);
    }
  }, []);

  const openDrawer = () => {
    if (navigationRef.isReady() && navigationRef.current) {
      navigationRef.current?.dispatch(DrawerActions.toggleDrawer());
    } else {
      console.warn('Drawer navigator not found or not ready!');
    }
  };

  const {loggedIn} = useAppSelector(state => state.user);
  const isUserSignedIn = loggedIn;
  return (
    <NavigationContainer ref={navigationRef}>
      {loggedIn && <ScreenHeader openDrawer={openDrawer} />}
      <Stack.Navigator
        screenOptions={{headerShown: false}}
        initialRouteName={
          isUserSignedIn
            ? screenNames.ACCOUNT_DRAWER_NAVIGATOR
            : screenNames.AUTH_NAVIGATOR
        }>
        <Stack.Screen
          name={screenNames.AUTH_NAVIGATOR}
          component={AuthNavigator}
        />
        <Stack.Screen
          name={screenNames.ACCOUNT_DRAWER_NAVIGATOR}
          component={AccountDrawerNavigator}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
