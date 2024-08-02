import React from 'react';
import {SafeAreaViewStatus} from '@src/components/layout/SafeAreaViewStatus';
import {Button} from 'react-native';
import TextInput from '@src/components/utility/text-input/TextInput';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '@src/types/navigation-types';
import screenNames from '@src/constants/screen-names';
import {InnerContainer} from '@src/components/layout/InnerContainer';
import TextLabel from '@src/components/utility/text-label/TextLabel';
import {theme} from '@src/theme';
import {Spacer} from '@src/components/layout/Spacer';

type SignupScreenNavigationProp = StackNavigationProp<RootStackParamList>;

export const SignupScreen = ({
  navigation,
}: {
  navigation: SignupScreenNavigationProp;
}) => {
  return (
    <SafeAreaViewStatus>
      <InnerContainer>
        <TextLabel text="Name:" />
        <TextInput placeholder="Name" />
        <TextLabel text="Phone Number:" />
        <TextInput placeholder="Phone number" keyboardType="numeric" />
        <TextLabel text="Email:" />
        <TextInput placeholder="Email" />
        <TextLabel text="Password:" />
        <TextInput placeholder="Password" secureTextEntry />
        <TextLabel text="Password Again:" />
        <TextInput placeholder="Password Again" secureTextEntry />
        <Spacer size={theme.space.lg} />
        <Button
          color={theme.colors.white}
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
