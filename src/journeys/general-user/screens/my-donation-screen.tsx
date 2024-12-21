import React, { useEffect, useState } from 'react';
import { FlatList } from 'react-native-gesture-handler';

import { getPeopleDonations } from '@src/api/get-people-donations';
import { InnerContainer } from '@src/components/layout/InnerContainer';
import { SafeAreaViewStatus } from '@src/components/layout/SafeAreaViewStatus';
import { Subheading } from '@src/components/molecules/subheading/Subheading';
import { PeopleProfileCard } from '@src/components/organisms/people-profile-card/PeopleProfileCard';
import { PeopleDonations } from '@src/types/people-donations-api-types';

import { DonationAmount } from '../styles/my-donation-screen.styles';

export const MyDonationsScreen = () => {
  const [peopleDonations, setPeopleDonations] = useState<PeopleDonations[]>([]);

  useEffect(() => {
    getPeopleDonations().then(response => setPeopleDonations(response));
  }, []);

  const getDonationsTotal = () => {
    const lengthOfDonations = peopleDonations.length * 10;
    return Math.floor(Math.random() * lengthOfDonations) + 1;
  };

  return (
    <SafeAreaViewStatus>
      <InnerContainer>
        <Subheading text="My Donations" />
        <DonationAmount>
          {`Your total so far, Keep it going!: £${getDonationsTotal()}`}
        </DonationAmount>
        <FlatList
          data={peopleDonations}
          renderItem={({ item }: { item: PeopleDonations }) => (
            <PeopleProfileCard item={item} />
          )}
          keyExtractor={item => item.login.uuid.toString()}
          contentContainerStyle={{
            justifyContent: 'center',
            paddingHorizontal: 8,
          }}
        />
      </InnerContainer>
    </SafeAreaViewStatus>
  );
};
