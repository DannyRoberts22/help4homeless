import React, { useEffect, useState } from 'react';
import { Alert, TouchableOpacity } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

import { firebaseGetHomelessPersons } from '@src/api/homeless-persons';
import { InnerContainer } from '@src/components/layout/InnerContainer';
import { SafeAreaViewStatus } from '@src/components/layout/SafeAreaViewStatus';
import { Spacer } from '@src/components/layout/Spacer';
import { ShareableButton } from '@src/components/organisms/shareable-button/ShareableButton';
import TextInput from '@src/components/utility/text-input/TextInput';
import screenNames from '@src/constants/screen-names';
import { theme } from '@src/theme';

import AddUserModal from '../modals/AddUserModal';

import {
  DashboardContainer,
  HomelessUserDetails,
  HomelessUserItem,
} from '../styles/dashboard-screen.styles';
interface HomelessPerson {
  id: string;
  firstName: string;
  surname: string;
}

import { NavigationProp } from '@react-navigation/native';

import { RootStackParamList } from '@src/types/navigation-types';

type DashboardScreenProp = NavigationProp<RootStackParamList>;

export const DashboardScreen = ({
  navigation,
}: {
  navigation: DashboardScreenProp;
}) => {
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [homelessPersons, setHomelessPersons] = useState<HomelessPerson[]>([]);
  const [filteredHomelessPersons, setfilteredHomelessPersons] =
    useState(homelessPersons);
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    firebaseGetHomelessPersons().then(data => {
      console.log('🚀 ~ firebaseGetHomelessPersons ~ data:', data);
      setHomelessPersons(data);
    });
  }, [showAddUserModal]);

  useEffect(() => {
    setfilteredHomelessPersons(homelessPersons);
  }, [homelessPersons]);

  const handleSearch = (input: string) => {
    setSearchQuery(input);

    if (input) {
      // Filter by both `name` and `id`
      const filtered = homelessPersons.filter(
        item =>
          item.firstName.toLowerCase().includes(input.toLowerCase()) ||
          item.surname.toLowerCase().includes(input.toLowerCase()) ||
          item.id.includes(input),
      );
      // console.log('🚀 ~ handleSearch ~ filtered:', filtered);
      setfilteredHomelessPersons(filtered);
    } else {
      // If the search is cleared, show the full list
      console.log('🚀 ~ DashboardScreen ~ homelessPersons:', homelessPersons);
      setfilteredHomelessPersons(homelessPersons);
    }
  };

  const renderItem = ({ item }: any) => {
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate(screenNames.HOMELESS_PERSON_PROFILE_MODAL, {
            id: item.id,
          })
        }
      >
        <HomelessUserItem style={{ flexDirection: 'row' }}>
          <HomelessUserDetails>{`${item.person.firstName} ${item.person.surname}`}</HomelessUserDetails>
          <HomelessUserDetails>{item.id.slice(0, 6)}</HomelessUserDetails>
        </HomelessUserItem>
      </TouchableOpacity>
    );
  };
  return (
    <SafeAreaViewStatus>
      <InnerContainer>
        <DashboardContainer>
          <ShareableButton
            handler={() => setShowAddUserModal(true)}
            text="Add Person"
          />
          <Spacer size={theme.space.lg} />
          <TextInput
            placeholder="Search For User"
            value={searchQuery}
            onChangeText={handleSearch}
          />
          <FlatList
            data={filteredHomelessPersons}
            renderItem={renderItem}
            keyExtractor={item => item.id}
          />
        </DashboardContainer>
        <ShareableButton
          handler={() => Alert.alert('Generate QR codes for all')}
          text="Generate QR codes for all"
        />
        <AddUserModal
          modalVisible={showAddUserModal}
          closeModal={() => setShowAddUserModal(false)}
        />
      </InnerContainer>
    </SafeAreaViewStatus>
  );
};
