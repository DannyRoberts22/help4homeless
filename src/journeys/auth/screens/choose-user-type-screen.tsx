import { NavigationProp } from '@react-navigation/native';
import { InnerContainer } from '@src/components/layout/InnerContainer';
import { SafeAreaViewStatus } from '@src/components/layout/SafeAreaViewStatus';
import { Spacer } from '@src/components/layout/Spacer';
import SectionTitle from '@src/components/molecules/section-title/SectionTitle';
import { ShareableButton } from '@src/components/organisms/shareable-button/ShareableButton';
import screenNames from '@src/constants/screen-names';
import { theme } from '@src/theme';
import { RootStackParamList } from '@src/types/navigation-types';
import React from 'react';
import { Share } from 'react-native';

export type ChooseUserTypeScreenProps = {
  navigation: NavigationProp<RootStackParamList>;
};

const ChooseUserTypeScreen = ({ navigation }: ChooseUserTypeScreenProps) => {
  return (
    <SafeAreaViewStatus>
      <InnerContainer>
        <SectionTitle>Please choose are you</SectionTitle>
        <Spacer size={theme.space.lg} />
        <ShareableButton
          handler={() => navigation.navigate(screenNames.SIGNUP_SCREEN)}
          text="Standard User"
        />
        <Spacer size={theme.space.sm} />
        <SectionTitle>Or</SectionTitle>
        <Spacer size={theme.space.sm} />
        <ShareableButton
          handler={() =>
            navigation.navigate(screenNames.HOMELESS_SHELTER_SIGNUP_SCREEN)
          }
          text="Homeless Shelter"
        />
        <Spacer size={theme.space.lg} />
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

export default ChooseUserTypeScreen;
