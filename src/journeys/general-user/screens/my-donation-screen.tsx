import React, { useCallback, useEffect, useState } from 'react';
import { FlatList, ActivityIndicator } from 'react-native';

import { firebaseGetPeopleDonations } from '@src/api/people-donations';
import { InnerContainer } from '@src/components/layout/InnerContainer';
import { SafeAreaViewStatus } from '@src/components/layout/SafeAreaViewStatus';
import { Subheading } from '@src/components/molecules/subheading/Subheading';
import PeopleProfileCard from '@src/components/organisms/people-profile-card/PeopleProfileCard';

import { DonationAmount } from '../styles/my-donation-screen.styles';
import { PeopleDonation } from '@src/api/types';
import { useFocusEffect } from '@react-navigation/native';
import { theme } from '@src/theme';

export const MyDonationsScreen = () => {
  const [peopleDonations, setPeopleDonations] = useState<PeopleDonation[]>([]);
  console.log('🚀 ~ MyDonationsScreen ~ peopleDonations:', peopleDonations);
  const [donationsTotal, setDonationsTotal] = useState(0);
  console.log('🚀 ~ MyDonationsScreen ~ donationsTotal:', donationsTotal);
  const [isLoading, setIsLoading] = useState(true); // Add loading state

  const getDonationsTotal = () => {
    setDonationsTotal(
      peopleDonations.reduce((acc, donation) => acc + donation.amount, 0),
    );
    return;
  };

  useFocusEffect(
    useCallback(() => {
      setIsLoading(true);
      firebaseGetPeopleDonations()
        .then(response =>
          setPeopleDonations(
            response.map((donation: PeopleDonation, i: number) => {
              return { ...donation, id: i };
            }),
          ),
        )
        .then(() => setIsLoading(false));
    }, []),
  );

  useEffect(() => {
    getDonationsTotal();
  }, [peopleDonations]);

  return (
    <SafeAreaViewStatus>
      <InnerContainer>
        {isLoading ? (
          <ActivityIndicator size="large" color={theme.colors.softWhite} />
        ) : (
          <>
            <Subheading text="My Donations" />
            <DonationAmount>
              {donationsTotal > 0
                ? `Your total so far, Keep it going! £${donationsTotal / 100}`
                : 'You have made no donations yet, scan and start donating'}
            </DonationAmount>
            <FlatList
              data={peopleDonations}
              renderItem={({ item }: { item: PeopleDonation }) => (
                <PeopleProfileCard item={item} />
              )}
              keyExtractor={item => String(item.id)}
              contentContainerStyle={{
                justifyContent: 'center',
                paddingVertical: 8,
                paddingHorizontal: 8,
              }}
              style={{ flex: 1, width: '100%' }}
              initialNumToRender={10}
              maxToRenderPerBatch={10}
              windowSize={5}
            />
          </>
        )}
      </InnerContainer>
    </SafeAreaViewStatus>
  );
};
