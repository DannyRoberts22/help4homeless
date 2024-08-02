import {StackNavigationProp} from '@react-navigation/stack';
import {InnerContainer} from '@src/components/layout/InnerContainer';
import {SafeAreaViewStatus} from '@src/components/layout/SafeAreaViewStatus';
import TextInput from '@src/components/utility/text-input/TextInput';
import TextLabel from '@src/components/utility/text-label/TextLabel';
import screenNames from '@src/constants/screen-names';
import {theme} from '@src/theme';
import {RootStackParamList} from '@src/types/navigation-types';
import React from 'react';
import {Button} from 'react-native';

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
        <TextLabel text="Email:" />
        <TextInput placeholder="Email" />
        <Button
          color={theme.colors.white}
          title="Reset Password?"
          onPress={() => handleReset()}
        />
      </InnerContainer>
    </SafeAreaViewStatus>
  );
};
