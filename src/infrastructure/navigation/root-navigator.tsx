import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import MainNavigator from './main-navigator';
import AuthNavigator from './auth-navigator';
import {createStackNavigator} from '@react-navigation/stack';
import screenNames from '@src/constants/screen-names';
// import {useAppwriteContext} from '@src/providers/AppwriteContext';

const Stack = createStackNavigator();

export const Navigation = () => {
  // const context = useAppwriteContext();
  // const isUserSignedIn = context?.loggedInUser !== null;
  // console.log('🚀 ~ Navigation ~ isUserSignedIn:', isUserSignedIn);
  const isUserSignedIn = false;
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{headerShown: false}}
        initialRouteName={
          isUserSignedIn
            ? screenNames.MAIN_NAVIGATOR
            : screenNames.AUTH_NAVIGATOR
        }>
        <Stack.Screen
          name={screenNames.AUTH_NAVIGATOR}
          component={AuthNavigator}
        />
        <Stack.Screen
          name={screenNames.MAIN_NAVIGATOR}
          component={MainNavigator}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
