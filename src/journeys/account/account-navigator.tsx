import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { RootStackParamList } from 'types/navigation';
import screenNames from 'constants/screen-names';
import { AccountScreen } from './screens/account-screen';

const Stack = createStackNavigator<RootStackParamList>();

const AccountNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name={screenNames.ACCOUNT_SCREEN} component={AccountScreen} />
    </Stack.Navigator>
  )
}

export default AccountNavigator