import React from 'react';
import {Text} from 'react-native';
import {SafeAreaViewStatus} from '@src/components/layout/SafeAreaViewStatus';
import {InnerContainer} from '@src/components/layout/InnerContainer';

export const HomeScreen = () => {
  return (
    <SafeAreaViewStatus>
      <InnerContainer>
        <Text>HomeScreen</Text>
      </InnerContainer>
    </SafeAreaViewStatus>
  );
};
