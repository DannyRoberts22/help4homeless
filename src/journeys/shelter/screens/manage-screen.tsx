import {InnerContainer} from '@src/components/layout/InnerContainer';
import {SafeAreaViewStatus} from '@src/components/layout/SafeAreaViewStatus';
import React from 'react';
import {Text} from 'react-native';

export const ManageScreen = () => {
  return (
    <SafeAreaViewStatus>
      <InnerContainer>
        <Text>ManageScreen</Text>
      </InnerContainer>
    </SafeAreaViewStatus>
  );
};
