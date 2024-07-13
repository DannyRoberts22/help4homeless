import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {TabNavigator} from './tab-navigator';

export const Navigation = () => {
  return (
    <NavigationContainer>
      <TabNavigator />
    </NavigationContainer>
  );
};
