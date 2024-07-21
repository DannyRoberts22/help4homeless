import React from 'react';
import {View, Text} from 'react-native';
import {SafeAreaViewStatus} from '@src/components/layout/SafeAreaViewStatus';
import Icon from 'react-native-vector-icons/FontAwesome';
import ScreenHeader from '@src/components/utility/screen-header/ScreenHeader';
import * as CSS from '@src/journeys/general-user/styles/home-screen.styles';

export const HomeScreen = () => {
  return (
    <SafeAreaViewStatus>
      <ScreenHeader />
      <CSS.HomeContainer>
        <Text>HomeScreen</Text>
      </CSS.HomeContainer>
    </SafeAreaViewStatus>
  );
};
