import {InnerContainer} from '@src/components/layout/InnerContainer';
import {SafeAreaViewStatus} from '@src/components/layout/SafeAreaViewStatus';
import React from 'react';
import {Alert} from 'react-native';
import {
  ProfileContainer,
  ProfileContent,
  ProfileTitle,
} from '../styles/profile-screen.styles';
import {ShareableButton} from '@src/components/organisms/shareable-button/ShareableButton';
import {Subheading} from '@src/components/molecules/subheading/Subheading';
import {Spacer} from '@src/components/layout/Spacer';
import {theme} from '@src/theme';

export const ProfileScreen = () => {
  return (
    <SafeAreaViewStatus>
      <InnerContainer>
        <Subheading text="My Account" />
        <Spacer size={theme.space.lg} />
        <ProfileContainer>
          <ProfileTitle>The Upper Room</ProfileTitle>
          <Spacer size={theme.space.lg} />
          <ProfileTitle>Address</ProfileTitle>
          <ProfileContent>St Saviour Wendell Park Church</ProfileContent>
          <ProfileContent>Cobbold Road</ProfileContent>
          <ProfileContent>London</ProfileContent>
          <ProfileContent>W12 9LN</ProfileContent>
          <Spacer size={theme.space.sm} />
          <ProfileTitle>Email</ProfileTitle>
          <ProfileContent>uradmin@theupperroom.org.uk</ProfileContent>
          <Spacer size={theme.space.sm} />
          <ProfileTitle>Phone</ProfileTitle>
          <ProfileContent>020 8740 5688</ProfileContent>
          <Spacer size={theme.space.md} />
          <ProfileTitle>Card Details</ProfileTitle>
          <ProfileContent>Card number: **** **** 4382</ProfileContent>
          <ProfileContent>Expiry date: 08/2026</ProfileContent>
          <Spacer size={theme.space.lg} />

          <ShareableButton
            handler={function (): void {
              Alert.alert('Update');
            }}
            text="Update"
          />
          <Spacer size={theme.space.lg} />
          <Spacer size={theme.space.lg} />

          <ShareableButton
            handler={function (): void {
              Alert.alert('Help');
            }}
            text="Get Help"
          />
        </ProfileContainer>
      </InnerContainer>
    </SafeAreaViewStatus>
  );
};
