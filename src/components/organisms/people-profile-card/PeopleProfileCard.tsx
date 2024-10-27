import {
  DetailsContainer,
  Title,
} from '@src/components/molecules/card-components/styles';
import React from 'react';
import {PeopleDonations} from '@src/types/people-donations-api-types';
import {
  DonationTotal,
  PeopleProfileCardContainer,
  ProfileImage,
} from './styles';

export const PeopleProfileCard = ({item}: {item: PeopleDonations}) => {
  return (
    <PeopleProfileCardContainer height="xs">
      <ProfileImage source={{uri: item.picture.large}} />
      <DetailsContainer>
        <Title>{item.name.first}</Title>
        <DonationTotal>
          Donation Total: £{Math.floor(Math.random() * 10) + 1}
        </DonationTotal>
      </DetailsContainer>
    </PeopleProfileCardContainer>
  );
};
