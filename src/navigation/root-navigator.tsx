import * as React from 'react';
import {
  DrawerActions,
  NavigationContainer,
  NavigationState,
} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import AuthNavigator from './auth-navigator';

const Stack = createStackNavigator<RootStackParamList>();
import { createNavigationContainerRef } from '@react-navigation/native';

import ScreenHeader from '@src/components/utility/screen-header/ScreenHeader';
import screenNames from '@src/constants/screen-names';
import { useAppSelector } from '@src/hooks/redux/reduxHooks';
import { HomelessPersonProfileModal } from '@src/journeys/shelter/modals/homeless-person-profile-modal';

import { AccountDrawerNavigator } from './account-drawer.navigator';
import { RootStackParamList } from '@src/types/navigation-types';
import { CheckoutModal } from '@src/journeys/general-user/modals/checkout-modal';
import { useEffect } from 'react';

export const navigationRef = createNavigationContainerRef<RootStackParamList>();

export const Navigation = () => {
  const [isModalActive, setIsModalActive] = React.useState(false);
  React.useEffect(() => {
    if (navigationRef.current) {
      console.log('Current navigation ref:', navigationRef.current);
    }
    // if (!isUserSignedIn) {
    // navigationRef.current?.reset({
    //   index: 0,
    //   routes: [{ name: screenNames.AUTH_NAVIGATOR }],
    // });
    //   // }
    //   navigationRef.current?.navigate(screenNames.AUTH_NAVIGATOR);
    // }
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
    console.log('🚀 ~ onStateChange ~ currentRoute:', currentRoute);
    setIsModalActive(currentRoute?.name === screenNames.ABOUT_SCREEN);
    // if (!isUserSignedIn) {
    //   // Redirect to login page if the user is not logged in
    //   navigationRef.current?.navigate(screenNames.LOGIN_SCREEN);
    //   return false; // Prevent further navigation
    // }
    // if (!isUserSignedIn) {
    //   navigationRef.current?.reset({
    //     index: 0,
    //     routes: [{ name: screenNames.AUTH_NAVIGATOR }],
    //   });
    //   // }
    //   navigationRef.current?.reset({
    //     index: 0,
    //     routes: [{ name: screenNames.AUTH_NAVIGATOR }],
    //   });
    //   return false; // Prevent further navigation
    // }
  };

  const { loggedIn } = useAppSelector(state => state.user);
  const isUserSignedIn = loggedIn;

  // useEffect(() => {
  //   console.log(
  //     'Current Navigation State:',
  //     navigationRef.current?.getRootState(),
  //   );
  //   if (!isUserSignedIn) {
  //     console.log('does this run?');
  //     navigationRef.current?.navigate(screenNames.AUTH_NAVIGATOR);
  //   }

  // }, []);

  return (
    <NavigationContainer
      ref={navigationRef}
      onStateChange={onStateChange}
      linking={{
        prefixes: ['https://example.com', 'helpapp://'],
        config: {
          screens: {
            [screenNames.ACCOUNT_DRAWER_NAVIGATOR]: {
              screens: {
                [screenNames.MAIN_NAVIGATOR]: {
                  screens: {
                    [screenNames.GENERAL_USER_NAVIGATOR]: {
                      screens: {
                        [screenNames.QR_SCAN_SCREEN]: {
                          path: 'app/qrscan',
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      }}
    >
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
          {/* TODO: Remove checkout modal logic throughout app */}
          <Stack.Screen
            name={screenNames.CHECKOUT_MODAL}
            component={CheckoutModal}
          />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
};
