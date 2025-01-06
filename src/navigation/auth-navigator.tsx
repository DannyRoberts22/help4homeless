import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import screenNames from '@src/constants/screen-names';
import { ForgottenPasswordScreen } from '@src/journeys/auth/screens/forgotten-password-screen';
import { LoginScreen } from '@src/journeys/auth/screens/login-screen';
import { SignupScreen } from '@src/journeys/auth/screens/standard-user-signup-screen';
import { RootStackParamList } from '@src/types/navigation-types';
import { HomelessShelterSignupScreen } from '@src/journeys/auth/screens/shelter-user-signup-screen';
import ChooseUserTypeScreen from '@src/journeys/auth/screens/choose-user-type-screen';

const Stack = createStackNavigator<RootStackParamList>();

const AuthNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={screenNames.LOGIN_SCREEN} component={LoginScreen} />
      <Stack.Screen name={screenNames.SIGNUP_SCREEN} component={SignupScreen} />
      <Stack.Screen
        name={screenNames.HOMELESS_SHELTER_SIGNUP_SCREEN}
        component={HomelessShelterSignupScreen}
      />
      <Stack.Screen
        name={screenNames.CHOOSE_USER_TYPE_SCREEN}
        component={ChooseUserTypeScreen}
      />
      <Stack.Screen
        name={screenNames.FORGOTTON_PASSWORD_SCREEN}
        component={ForgottenPasswordScreen}
      />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
