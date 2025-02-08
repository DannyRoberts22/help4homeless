import React from 'react';
import { Alert, Linking, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import auth from '@react-native-firebase/auth';

import { firebaseDeleteUser } from '@src/api/auth-services';
import { InnerContainer } from '@src/components/layout/InnerContainer';
import { SafeAreaViewStatus } from '@src/components/layout/SafeAreaViewStatus';
import { Spacer } from '@src/components/layout/Spacer';
import { Subheading } from '@src/components/molecules/subheading/Subheading';
import { ShareableButton } from '@src/components/organisms/shareable-button/ShareableButton';
import screenNames from '@src/constants/screen-names';
import { useAppDispatch, useAppSelector } from '@src/hooks/redux/reduxHooks';
import { deleteUser } from '@src/store/redux/slices/userSlice';
import { theme } from '@src/theme';

import {
  ProfileContainer,
  ProfileContent,
  ProfileTitle,
} from '../styles/profile-screen.styles';

const handleDeleteCurrentUser = async () => {
  try {
    const currentUser = auth().currentUser;
    if (currentUser) {
      await firebaseDeleteUser(currentUser.uid);
      console.log('User deleted successfully!');
    } else {
      console.error('No user is currently signed in.');
    }
  } catch (error) {
    console.error('Error handling deleting current user:', error);
  }
};

import { StackNavigationProp } from '@react-navigation/stack';

import { RootStackParamList } from '@src/types/navigation-types';
import SectionDescription from '@src/components/molecules/section-description/SectionDescription';

type ProfileScreenNavigationProp = StackNavigationProp<RootStackParamList>;

export const ProfileScreen = ({
  navigation,
}: {
  navigation: ProfileScreenNavigationProp;
}) => {
  const dispatch = useAppDispatch();
  // const { currentUser } = auth();
  const {
    userType,
    firstName,
    surname,
    businessName,
    houseNameOrNumber,
    addressLineOne,
    addressLineTwo,
    city,
    postcode,
    email,
    phoneNumber,
  } = useAppSelector(state => state.user);
  console.log('🚀 ~ businessName:', businessName);

  //TODO: Make mailto work
  const sendEmail = () => {
    const email = 'info.help@gmail.com';
    const subject = 'Hello';
    const body = 'I wanted to reach out about...';
    const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;

    console.log('mailtoLink:', mailtoLink);
    Linking.canOpenURL(mailtoLink)
      .then(supported => {
        if (supported) {
          Linking.openURL(mailtoLink);
        } else {
          Alert.alert(
            'Mail app not available',
            'This device does not appear to have a mail app configured.',
          );
        }
      })
      .catch(error => console.error('Error opening mail app', error));
  };

  return (
    <SafeAreaViewStatus>
      <ScrollView>
        <InnerContainer>
          <ProfileContainer>
            {/* <ProfileTitle>Name:</ProfileTitle> */}
            {userType === 'shelterUser' ? (
              <ProfileContent>{businessName}</ProfileContent>
            ) : (
              <ProfileContent>{`${firstName} ${surname}`}</ProfileContent>
            )}
            {addressLineOne && (
              <>
                <Spacer size={theme.space.md} />
                {/* <ProfileTitle>Address:</ProfileTitle> */}

                <ProfileContent>{`${houseNameOrNumber} ${addressLineOne}`}</ProfileContent>
                {addressLineTwo && (
                  <ProfileContent>{addressLineTwo}</ProfileContent>
                )}
                <ProfileContent>{city}</ProfileContent>
                <ProfileContent>{postcode}</ProfileContent>
                <Spacer size={theme.space.md} />
              </>
            )}
            {/* <ProfileTitle>Email:</ProfileTitle> */}
            <ProfileContent>{email}</ProfileContent>
            <Spacer size={theme.space.md} />
            {/* <ProfileTitle>Phone:</ProfileTitle> */}
            <ProfileContent>{phoneNumber}</ProfileContent>
            <Spacer size={theme.space.md} />
            {/* <ProfileTitle>Card Details:</ProfileTitle> */}
            <ProfileContent>Card number: **** **** 4382</ProfileContent>
            <ProfileContent>Expiry date: 08/2026</ProfileContent>
            <Spacer size={theme.space.xxl} />

            {/* //TODO: Add functionality to update user details */}
            {/* <ShareableButton
              handler={function (): void {
                Alert.alert('Update');
              }}
              text="Update"
            />
            <Spacer size={theme.space.lg} /> */}

            <ShareableButton
              handler={function (): void {
                Alert.alert(
                  'Delete My Account',
                  'Are you sure you want to delete your account? This action cannot be undone.',
                  [
                    {
                      text: 'Cancel',
                      style: 'cancel',
                    },
                    {
                      text: 'Delete',
                      onPress: () =>
                        handleDeleteCurrentUser()
                          .then(() => {
                            dispatch(deleteUser());
                          })
                          .then(() => {
                            navigation.navigate(screenNames.LOGIN_SCREEN);
                          })
                          .catch(error => {
                            console.error('Error deleting user:', error);
                            Alert.alert('Error', 'Failed to delete account.');
                          }),
                    },
                  ],
                );
              }}
              text="Delete my account"
            />
            <Spacer size={theme.space.lg} />
            <SectionDescription>For Assistance please email</SectionDescription>
            <TouchableOpacity onPress={() => sendEmail()}>
              <SectionDescription>info.help@gmail.com</SectionDescription>
            </TouchableOpacity>
          </ProfileContainer>
        </InnerContainer>
      </ScrollView>
    </SafeAreaViewStatus>
  );
};
