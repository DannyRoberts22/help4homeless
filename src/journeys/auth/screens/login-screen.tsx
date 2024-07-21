import React from 'react';
import {SafeAreaViewStatus} from '@src/components/layout/SafeAreaViewStatus';
import {Text, Button} from 'react-native';
import TextInput from '@src/components/utility/text-input/TextInput';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '@src/types/navigation-types';
import screenNames from '@src/constants/screen-names';
import {InnerContainer} from '@src/components/layout/InnerContainer';
import {Spacer} from '@src/components/layout/Spacer';
import {theme} from '@src/theme';

type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList>;

export const LoginScreen = ({
  navigation,
}: {
  navigation: LoginScreenNavigationProp;
}) => {
  return (
    <SafeAreaViewStatus>
      <InnerContainer>
        <Text>Email:</Text>
        <TextInput placeholder="Email" />
        <Text>Password:</Text>
        <TextInput placeholder="Password" secureTextEntry />
        <Button
          title="Login"
          onPress={() =>
            navigation.replace(screenNames.MAIN_NAVIGATOR, {
              screen: screenNames.HOME_SCREEN,
            })
          }
        />
        <Button
          title="Forgot Password?"
          onPress={() =>
            navigation.navigate(screenNames.FORGOTTON_PASSWORD_SCREEN)
          }
        />
        <Spacer size={theme.space.lg} />
        <Button
          title="Sign Up"
          onPress={() => navigation.navigate(screenNames.SIGNUP_SCREEN)}
        />
      </InnerContainer>
    </SafeAreaViewStatus>
  );
};
