import React from 'react';
import { Alert } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import auth from '@react-native-firebase/auth';

import { firebaseDeleteUser } from '@src/api/auth-services';
import { InnerContainer } from '@src/components/layout/InnerContainer';
import { SafeAreaViewStatus } from '@src/components/layout/SafeAreaViewStatus';
import { Spacer } from '@src/components/layout/Spacer';
import { Subheading } from '@src/components/molecules/subheading/Subheading';
import { ShareableButton } from '@src/components/organisms/shareable-button/ShareableButton';
import screenNames from '@src/constants/screen-names';
import { useAppDispatch } from '@src/hooks/redux/reduxHooks';
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

type ProfileScreenNavigationProp = StackNavigationProp<RootStackParamList>;

export const ProfileScreen = ({
  navigation,
}: {
  navigation: ProfileScreenNavigationProp;
}) => {
  const { currentUser } = auth();
  const dispatch = useAppDispatch();
  console.log('🚀 ~ ProfileScreen ~ currentUser:', currentUser);
  return (
    <SafeAreaViewStatus>
      <ScrollView>
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
              text="Delete My Account"
            />
            <Spacer size={theme.space.lg} />

            <ShareableButton
              handler={function (): void {
                Alert.alert('Help');
              }}
              text="Get Help"
            />
          </ProfileContainer>
        </InnerContainer>
      </ScrollView>
    </SafeAreaViewStatus>
  );
};
