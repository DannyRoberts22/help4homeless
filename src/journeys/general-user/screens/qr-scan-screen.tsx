import {InnerContainer} from '@src/components/layout/InnerContainer';
import {SafeAreaViewStatus} from '@src/components/layout/SafeAreaViewStatus';
import React from 'react';
import {Text} from 'react-native';

export const QRScanScreen = () => {
  return (
    <SafeAreaViewStatus>
      <InnerContainer>
        <Text>QRScanScreen</Text>
      </InnerContainer>
    </SafeAreaViewStatus>
  );
};
