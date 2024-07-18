import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import MainNavigator from './main-navigator';

export const Navigation = () => {
  return (
    <NavigationContainer>
      <MainNavigator />
    </NavigationContainer>
  );
};
