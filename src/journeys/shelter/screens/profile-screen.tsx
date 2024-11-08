import {InnerContainer} from '@src/components/layout/InnerContainer';
import {SafeAreaViewStatus} from '@src/components/layout/SafeAreaViewStatus';
import React from 'react';
import {Alert, Text} from 'react-native';
import {
  AddressContainer,
  AddressContent,
  AddressTitle,
} from '../styles/profile-screen.styles';
import {ShareableButton} from '@src/components/organisms/button/Button';
import {Subheading} from '@src/components/molecules/subheading/Subheading';

export const ProfileScreen = () => {
  return (
    <SafeAreaViewStatus>
      <InnerContainer>
        <Subheading text="My Account" />
        <AddressContainer>
          <AddressTitle>The Upper Room</AddressTitle>
          <AddressTitle>Address</AddressTitle>
          <AddressContent>St Saviour Wendell Park Church</AddressContent>
          <AddressContent>Cobbold Road</AddressContent>
          <AddressContent>London</AddressContent>
          <AddressContent>W12 9LN</AddressContent>
          <AddressTitle>Email</AddressTitle>
          <AddressContent>uradmin@theupperroom.org.uk</AddressContent>
          <AddressTitle>Phone</AddressTitle>
          <AddressContent>020 8740 5688</AddressContent>
          <ShareableButton
            handler={function (): void {
              Alert.alert('Help');
            }}
            text="Get Help"
          />
        </AddressContainer>
      </InnerContainer>
    </SafeAreaViewStatus>
  );
};
