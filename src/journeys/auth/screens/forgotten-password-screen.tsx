import {StackNavigationProp} from '@react-navigation/stack';
import {InnerContainer} from '@src/components/layout/InnerContainer';
import {SafeAreaViewStatus} from '@src/components/layout/SafeAreaViewStatus';
import TextInput from '@src/components/utility/text-input/TextInput';
import InputTextLabel from '@src/components/utility/input-text-label/InputTextLabel';
import screenNames from '@src/constants/screen-names';
import {theme} from '@src/theme';
import {RootStackParamList} from '@src/types/navigation-types';
import React from 'react';
import {ShareableButton} from '@src/components/organisms/shareable-button/ShareableButton';
import {firebaseResetPassword} from '@src/api/auth-services';
import {Spacer} from '@src/components/layout/Spacer';
import {Alert} from 'react-native';

type ForgottenPasswordScreenNavigationProp =
  StackNavigationProp<RootStackParamList>;

export const ForgottenPasswordScreen = ({
  navigation,
}: {
  navigation: ForgottenPasswordScreenNavigationProp;
}) => {
  const [email, setEmail] = React.useState<string>('');

  const handleReset = () => {
    firebaseResetPassword(email)
      .then(() =>
        Alert.alert(
          'Reset password was successful',
          'Press ok to go to login',
          [
            {
              text: 'Cancel',
              style: 'cancel',
            },
            {
              text: 'OK',
              onPress: () => navigation.navigate(screenNames.LOGIN_SCREEN),
            },
          ],
        ),
      )
      .catch(() => Alert.alert('Reset password was not successful'));
  };
  return (
    <SafeAreaViewStatus>
      <InnerContainer>
        <InputTextLabel text="Email:" />
        <TextInput placeholder="Email" value={email} onChangeText={setEmail} />
        <ShareableButton
          color="white"
          text="Reset Password"
          handler={() => handleReset()}
        />
        <Spacer size={theme.space.xl} />
        <ShareableButton
          color="white"
          text="Back to Login"
          handler={() => {
            navigation.goBack();
          }}
        />
      </InnerContainer>
    </SafeAreaViewStatus>
  );
};
