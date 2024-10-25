import {InnerContainer} from '@src/components/layout/InnerContainer';
import {SafeAreaViewStatus} from '@src/components/layout/SafeAreaViewStatus';
import React, {useEffect, useState} from 'react';
import {Subheading} from '@src/components/molecules/subheading/Subheading';
import {getPeopleDonations} from '@src/api/getPeopleDonations';
import {FlatList} from 'react-native-gesture-handler';
import {PeopleDonations} from '@src/types/people-donations-api-types';
import {PeopleProfileCard} from '@src/components/organisms/people-profile-card/PeopleProfileCard';

export const MyDonationsScreen = () => {
  const [peopleDonations, setPeopleDonations] = useState<PeopleDonations[]>([]);

  useEffect(() => {
    getPeopleDonations().then(response => setPeopleDonations(response));
  }, []);

  return (
    <SafeAreaViewStatus>
      <InnerContainer>
        <Subheading text="My Donations" />
        <FlatList
          data={peopleDonations}
          renderItem={({item}: {item: PeopleDonations}) => (
            <PeopleProfileCard item={item} />
          )}
          keyExtractor={item => item.id.toString()}
        />
      </InnerContainer>
    </SafeAreaViewStatus>
  );
};
