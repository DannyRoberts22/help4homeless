import React, { useCallback, useMemo, useState } from 'react';
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

import AddHomelessPersonModal from '../modals/add-homeless-person-modal';

import {
  DashboardContainer,
  HomelessUserDetails,
  HomelessUserItem,
} from '../styles/dashboard-screen.styles';

interface Person {
  firstName: string;
  surname: string;
}

interface HomelessPerson {
  id: string;
  person?: Person; // For nested structure
  firstName?: string; // For flat structure
  surname?: string; // For flat structure
}

import { NavigationProp, useFocusEffect } from '@react-navigation/native';

import { RootStackParamList } from '@src/types/navigation-types';

type DashboardScreenProp = NavigationProp<RootStackParamList>;

export const DashboardScreen = ({
  navigation,
}: {
  navigation: DashboardScreenProp;
}) => {
  const [showAddHomelessPersonModal, setShowAddHomelessPersonModal] =
    useState(false);
  const [homelessPersons, setHomelessPersons] = useState<HomelessPerson[]>([]);
  // const [filteredHomelessPersons, setfilteredHomelessPersons] =
  useState(homelessPersons);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const fetchHomelessPersons = useCallback(async () => {
    try {
      const data = await firebaseGetHomelessPersons();
      setHomelessPersons(data);
    } catch (error) {
      Alert.alert(
        'An error occurred while fetching homeless persons. Please try again later.',
      );
    }
  }, [showAddHomelessPersonModal]);

  useFocusEffect(
    useCallback(() => {
      fetchHomelessPersons();
    }, [fetchHomelessPersons]),
  );

  const filteredHomelessPersons = useMemo(() => {
    if (!searchQuery.trim()) {
      return homelessPersons; // Return all if search query is empty
    }

    const normalizedInput = searchQuery.trim().toLowerCase();

    return homelessPersons.filter(person => {
      // Add some debugging to understand the data structure
      console.log('Filtering person:', JSON.stringify(person));

      // Check if person.person exists (nested structure)
      if (person.person) {
        const firstName = (person.person.firstName || '').toLowerCase();
        const surname = (person.person.surname || '').toLowerCase();
        const id = (person.id || '').toLowerCase();

        return (
          firstName.includes(normalizedInput) ||
          surname.includes(normalizedInput) ||
          id.includes(normalizedInput)
        );
      } else {
        // Direct structure
        const firstName = (person.firstName || '').toLowerCase();
        const surname = (person.surname || '').toLowerCase();
        const id = (person.id || '').toLowerCase();

        return (
          firstName.includes(normalizedInput) ||
          surname.includes(normalizedInput) ||
          id.includes(normalizedInput)
        );
      }
    });
  }, [searchQuery, homelessPersons]);

  const handleSearch = useCallback((text: string) => {
    console.log('Search input:', text);
    setSearchQuery(text);
  }, []);

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
          <TextInput
            placeholder="Search for homeless person"
            value={searchQuery}
            onChangeText={handleSearch}
          />
          <FlatList
            data={filteredHomelessPersons}
            renderItem={renderItem}
            keyExtractor={item => item.id}
          />
          <Spacer size={theme.space.xxl} />
          <ShareableButton
            handler={() => setShowAddHomelessPersonModal(true)}
            text="Add person"
          />
        </DashboardContainer>
        <AddHomelessPersonModal
          modalVisible={showAddHomelessPersonModal}
          closeModal={() => setShowAddHomelessPersonModal(false)}
        />
      </InnerContainer>
    </SafeAreaViewStatus>
  );
};

function debounce(func: Function, wait: number) {
  let timeout: NodeJS.Timeout;
  return (...args: any[]) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}
