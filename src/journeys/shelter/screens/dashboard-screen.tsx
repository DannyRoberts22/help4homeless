import {InnerContainer} from '@src/components/layout/InnerContainer';
import {SafeAreaViewStatus} from '@src/components/layout/SafeAreaViewStatus';
import {ShareableButton} from '@src/components/organisms/button/Button';
import TextInput from '@src/components/utility/text-input/TextInput';
import React from 'react';
import {Alert} from 'react-native';

export const DashboardScreen = () => {
  return (
    <SafeAreaViewStatus>
      <InnerContainer>
        <TextInput placeholder="User ID" />
        <ShareableButton
          handler={() => Alert.alert('hey')}
          text="Search For User"
        />
      </InnerContainer>
    </SafeAreaViewStatus>
  );
};
