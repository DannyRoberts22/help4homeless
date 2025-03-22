import React from 'react';

import {
  DetailsContainer,
  Title,
} from '@src/components/molecules/card-components/styles';

import {
  DonationTotal,
  PeopleProfileCardContainer,
  ProfileImage,
} from './styles';
import { getRandomHomelessPersonImage } from '@src/utils/getRandomHomelessPersonImage';
import { PeopleDonation } from '@src/api/types';

const PeopleProfileCard = ({ item }: { item: PeopleDonation }) => {
  return (
    <PeopleProfileCardContainer height="xs">
      <ProfileImage source={getRandomHomelessPersonImage()} />
      <DetailsContainer>
        <Title>{item.name}</Title>
        <DonationTotal>
          Donation Total: £{(item?.amount / 100).toFixed(2)}
        </DonationTotal>
      </DetailsContainer>
    </PeopleProfileCardContainer>
  );
};

export default React.memo(PeopleProfileCard);
