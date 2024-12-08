import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {RootStackParamList} from '@src/types/navigation-types';
import screenNames from '../../constants/screen-names';
import GeneralUserNavigator from './general-user-navigator';
import ShelterUserNavigator from './shelter-user-navigator';
import {useAppSelector} from '@src/hooks/redux/reduxHooks';
import {UserOptionType} from '@src/services/types';

const Stack = createStackNavigator<RootStackParamList>();

const MainNavigator = () => {
  const {isShelterUser} = useAppSelector(state => state.user);
  console.log('🚀 ~ MainNavigator ~ isShelterUser:', isShelterUser);

  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName={
        isShelterUser === UserOptionType.SHELTER_USER
          ? screenNames.SHELTER_USER_NAVIGATOR
          : screenNames.GENERAL_USER_NAVIGATOR
      }>
      <Stack.Screen
        name={screenNames.GENERAL_USER_NAVIGATOR}
        component={GeneralUserNavigator}
      />
      <Stack.Screen
        name={screenNames.SHELTER_USER_NAVIGATOR}
        component={ShelterUserNavigator}
      />
    </Stack.Navigator>
  );
};

export default MainNavigator;
