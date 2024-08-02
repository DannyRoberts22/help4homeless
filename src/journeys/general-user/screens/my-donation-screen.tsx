import {InnerContainer} from '@src/components/layout/InnerContainer';
import {SafeAreaViewStatus} from '@src/components/layout/SafeAreaViewStatus';
import React from 'react';
import {Text} from 'react-native';

export const MyDonationsScreen = () => {
  return (
    <SafeAreaViewStatus>
      <InnerContainer>
        <Text>MyDonationsScreen</Text>
      </InnerContainer>
    </SafeAreaViewStatus>
  );
};
