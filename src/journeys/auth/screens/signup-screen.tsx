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

type SignupScreenNavigationProp = StackNavigationProp<RootStackParamList>;

export const SignupScreen = ({
  navigation,
}: {
  navigation: SignupScreenNavigationProp;
}) => {
  return (
    <SafeAreaViewStatus>
      <InnerContainer>
        <Text>Name:</Text>
        <TextInput placeholder="Name" />
        <Text>Phone number:</Text>
        <TextInput placeholder="Phone number" keyboardType="numeric" />
        <Text>Email:</Text>
        <TextInput placeholder="Email" />
        <Text>Password:</Text>
        <TextInput placeholder="Password" secureTextEntry />
        <Text>Password Again:</Text>
        <TextInput placeholder="Password Again" secureTextEntry />
        <Button
          title="Sign Up"
          onPress={() =>
            navigation.replace(screenNames.MAIN_NAVIGATOR, {
              screen: screenNames.HOME_SCREEN,
            })
          }
        />
      </InnerContainer>
    </SafeAreaViewStatus>
  );
};
