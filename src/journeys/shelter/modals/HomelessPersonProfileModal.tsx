import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { NavigationProp } from '@react-navigation/native';

import { firebaseGetHomelessPersonById } from '@src/api/homeless-persons';
import { InnerContainer } from '@src/components/layout/InnerContainer';
import { SafeAreaViewStatus } from '@src/components/layout/SafeAreaViewStatus';
import ScreenHeader from '@src/components/utility/screen-header/ScreenHeader';
import { RootStackParamList } from '@src/types/navigation-types';
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

  useEffect(() => {
    // get homeless person details from firebase with if
    firebaseGetHomelessPersonById(homelessPersonId).then(person => {
      setFirstName(person.firstName);
      setSurname(person.surname);
      setEmail(person.email);
      setPhoneNumber(person.phoneNumber);
    });
  });
  console.log('🚀 ~ firstName:', firstName);
  return (
    <SafeAreaViewStatus>
      <ScreenHeader isModal={true} handleClose={() => navigation.goBack()} />
      <InnerContainer>
        <View>
          <Text>{firstName}</Text>
          <Text>{surname}</Text>
          <Text>{email}</Text>
          <Text>{phoneNumber}</Text>
        </View>
      </InnerContainer>
    </SafeAreaViewStatus>
  );
};
