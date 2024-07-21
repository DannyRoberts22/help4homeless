import {StackNavigationProp} from '@react-navigation/stack';
import {InnerContainer} from '@src/components/layout/InnerContainer';
import {SafeAreaViewStatus} from '@src/components/layout/SafeAreaViewStatus';
import TextInput from '@src/components/utility/text-input/TextInput';
import screenNames from '@src/constants/screen-names';
import {RootStackParamList} from '@src/types/navigation-types';
import React from 'react';
import {Button, Text} from 'react-native';

type ForgottenPasswordScreenNavigationProp =
  StackNavigationProp<RootStackParamList>;

export const ForgottenPasswordScreen = ({
  navigation,
}: {
  navigation: ForgottenPasswordScreenNavigationProp;
}) => {
  const handleReset = () => {
    navigation.navigate(screenNames.LOGIN_SCREEN);
  };
  return (
    <SafeAreaViewStatus>
      <InnerContainer>
        <Text>Email:</Text>
        <TextInput placeholder="Email" />
        <Button title="Reset Password?" onPress={() => handleReset()} />
      </InnerContainer>
    </SafeAreaViewStatus>
  );
};
