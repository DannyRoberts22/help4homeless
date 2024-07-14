import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { RootStackParamList } from '@src/types/navigation-types'
import { LoginScreen } from '@src/journeys/auth/screens/login-screen'
import { ForgottenPasswordScreen } from '@src/journeys/auth/screens/forgotten-password-screen'
import { SignupScreen } from '@src/journeys/auth/screens/signup-screen'
import screenNames from '@src/constants/screen-names'

const Stack = createStackNavigator<RootStackParamList>()

const AuthNavigator = () => {
  return (
<Stack.Navigator>
    <Stack.Screen name={screenNames.LOGIN_SCREEN} component={LoginScreen} />
    <Stack.Screen name={screenNames.SIGNUP_SCREEN} component={SignupScreen} />
    <Stack.Screen name={screenNames.FORGOTTON_PASSWORD_SCREEN} component={ForgottenPasswordScreen} />
</Stack.Navigator>
  )
}

export default AuthNavigator