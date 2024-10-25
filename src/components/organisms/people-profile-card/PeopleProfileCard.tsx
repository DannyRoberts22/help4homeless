import {
  PeopleProfileCardContainer,
  DetailsContainer,
  Title,
} from '@src/components/molecules/card-components/style';
import React from 'react';
import {Image, Text} from 'react-native';
import {PeopleDonations} from '@src/types/people-donations-api-types';
export const PeopleProfileCard = ({item}: {item: PeopleDonations}) => {
  return (
    <PeopleProfileCardContainer height="xs">
      <Image
        source={{uri: item.picture.large}}
        style={{width: 100, height: '100%'}}
      />
      <DetailsContainer>
        <Title>{item.name.first}</Title>
        <Text style={{color: 'white'}}>
          Donation: {Math.floor(Math.random() * 10) + 1}
        </Text>
      </DetailsContainer>
    </PeopleProfileCardContainer>
  );
};
