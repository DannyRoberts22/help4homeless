import * as React from 'react';
import {
  DrawerActions,
  NavigationContainer,
  NavigationState,
} from '@react-navigation/native';
import { ParamListBase } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import AuthNavigator from './auth-navigator';

const Stack = createStackNavigator<RootStackParamList>();
import { createNavigationContainerRef } from '@react-navigation/native';

import ScreenHeader from '@src/components/utility/screen-header/ScreenHeader';
import screenNames from '@src/constants/screen-names';
import { useAppSelector } from '@src/hooks/redux/reduxHooks';
import { HomelessPersonProfileModal } from '@src/journeys/shelter/modals/HomelessPersonProfileModal';

import { AccountDrawerNavigator } from './account-drawer.navigator';
import { RootStackParamList } from '@src/types/navigation-types';

export const navigationRef = createNavigationContainerRef();

export const Navigation = () => {
  const [isModalActive, setIsModalActive] = React.useState(false);
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

  const onStateChange = (state: NavigationState | undefined) => {
    const currentRoute = state?.routes[state.index];
    setIsModalActive(
      currentRoute?.name === screenNames.HOMELESS_PERSON_PROFILE_MODAL,
    );
  };

  const { loggedIn } = useAppSelector(state => state.user);
  const isUserSignedIn = loggedIn;
  return (
    <NavigationContainer ref={navigationRef} onStateChange={onStateChange}>
      {loggedIn && !isModalActive && <ScreenHeader openDrawer={openDrawer} />}
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName={
          isUserSignedIn
            ? screenNames.ACCOUNT_DRAWER_NAVIGATOR
            : screenNames.AUTH_NAVIGATOR
        }
      >
        <Stack.Screen
          name={screenNames.AUTH_NAVIGATOR}
          component={AuthNavigator}
        />
        <Stack.Screen
          name={screenNames.ACCOUNT_DRAWER_NAVIGATOR}
          component={AccountDrawerNavigator}
        />
        <Stack.Group screenOptions={{ presentation: 'modal' }}>
          <Stack.Screen
            options={{ presentation: 'modal' }}
            name={screenNames.HOMELESS_PERSON_PROFILE_MODAL}
            component={HomelessPersonProfileModal}
          />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
};
