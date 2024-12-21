import React from 'react';
import { Text } from 'react-native';

import { InnerContainer } from '@src/components/layout/InnerContainer';
import { SafeAreaViewStatus } from '@src/components/layout/SafeAreaViewStatus';

export const ManageScreen = () => {
  return (
    <SafeAreaViewStatus>
      <InnerContainer>
        <Text>ManageScreen</Text>
        <Text>Add user</Text>
        <Text>Remove user</Text>
        <Text>Edit user</Text>
        <Text>ManageScreen</Text>
        <Text>ManageScreen</Text>
      </InnerContainer>
    </SafeAreaViewStatus>
  );
};
