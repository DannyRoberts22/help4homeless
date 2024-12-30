import React, { useEffect, useState } from 'react';
import { NavigationProp } from '@react-navigation/native';

import {
  firebaseDeleteHomelessPerson,
  firebaseGetHomelessPersonById,
} from '@src/api/homeless-persons';
import { InnerContainer } from '@src/components/layout/InnerContainer';
import { SafeAreaViewStatus } from '@src/components/layout/SafeAreaViewStatus';
import ScreenHeader from '@src/components/utility/screen-header/ScreenHeader';
import { RootStackParamList } from '@src/types/navigation-types';
import { getRandomUserProfileImage } from '@src/api/get-people-donations';
import { HomelessPersonProfileImage } from '../styles/homeless-person-profile-modal.styles';
import { ProfileContainer } from '@src/journeys/shared/styles/profile-screen.styles';
import SectionDescription from '@src/components/molecules/section-description/SectionDescription';
import { ShareableButton } from '@src/components/organisms/shareable-button/ShareableButton';
import { Spacer } from '@src/components/layout/Spacer';
import { theme } from '@src/theme';

export type HomelessPersonProfileModalProps = {
  route: { params: { id: string } };
  navigation: NavigationProp<RootStackParamList>;
};

export const HomelessPersonProfileModal = ({
  navigation,
  route,
}: HomelessPersonProfileModalProps) => {
  const { id: homelessPersonId } = route.params;
  const [firstName, setFirstName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [imageSource, setImageSource] = useState('');

  useEffect(() => {
    // get homeless person details from firebase with if
    firebaseGetHomelessPersonById(homelessPersonId).then(person => {
      setFirstName(person.firstName);
      setSurname(person.surname);
      setEmail(person.email);
      setPhoneNumber(person.phoneNumber);
    });
  });

  // TODO get real data from firebase storage when setup
  useEffect(() => {
    getRandomUserProfileImage().then(response => {
      setImageSource(response);
    });
  }, []);

  return (
    <SafeAreaViewStatus>
      <ScreenHeader isModal={true} handleClose={() => navigation.goBack()} />
      <InnerContainer>
        <ProfileContainer>
          {imageSource && (
            <HomelessPersonProfileImage source={{ uri: imageSource }} />
          )}
          <SectionDescription>{`${firstName} ${surname}`}</SectionDescription>
          <SectionDescription>{email}</SectionDescription>
          <SectionDescription>{phoneNumber}</SectionDescription>
          <SectionDescription>{homelessPersonId}</SectionDescription>
          <Spacer size={theme.space.lg} />
          <ShareableButton
            handler={() =>
              firebaseDeleteHomelessPerson(homelessPersonId)
                .then(() => navigation.goBack())
                .catch(error => {
                  console.error('Error deleting homeless person:', error);
                })
            }
            text="Delete User"
          />
        </ProfileContainer>
      </InnerContainer>
    </SafeAreaViewStatus>
  );
};
