import React from 'react';
import { Text } from 'react-native';

import { InnerContainer } from '@src/components/layout/InnerContainer';
import { SafeAreaViewStatus } from '@src/components/layout/SafeAreaViewStatus';

export const NotificationScreen = () => {
  return (
    <SafeAreaViewStatus>
      <InnerContainer>
        <Text>NotificationScreen</Text>
      </InnerContainer>
    </SafeAreaViewStatus>
  );
};
