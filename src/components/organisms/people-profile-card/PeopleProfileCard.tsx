import React from 'react';

import {
  DetailsContainer,
  Title,
} from '@src/components/molecules/card-components/styles';

import {
  DonateAgain,
  DonationTotal,
  PeopleProfileCardContainer,
  ProfileImage,
} from './styles';
import { getRandomHomelessPersonImage } from '@src/utils/getRandomHomelessPersonImage';
import { PeopleDonation } from '@src/api/types';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import screenNames from '@src/constants/screen-names';
import { RootStackParamList } from '@src/types/navigation-types';
import { StackNavigationProp } from '@react-navigation/stack';

const PeopleProfileCard = ({ item }: { item: PeopleDonation }) => {
  const removeLastUnderscoreAndDigits = (input: string): string => {
    const lastUnderscoreIndex = input.lastIndexOf('_'); // Find the last underscore
    return input.slice(0, lastUnderscoreIndex); // Slice the string up to the last underscore
  };

  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const handleDonateAgain = () => {
    console.log('Donate again pressed');
    navigation.reset({
      index: 0,
      routes: [
        {
          name: screenNames.QR_SCAN_SCREEN,
          params: { homelessPersonId: removeLastUnderscoreAndDigits(item.id) },
        },
      ],
    });
  };

  return (
    <PeopleProfileCardContainer height="xs">
      <ProfileImage source={getRandomHomelessPersonImage()} />
      <DetailsContainer>
        <Title>{item.name}</Title>
        <DonationTotal>
          Donation Total: £{(item?.amount / 100).toFixed(2)}
        </DonationTotal>
        <TouchableOpacity onPress={handleDonateAgain}>
          <DonateAgain>Donation again</DonateAgain>
        </TouchableOpacity>
      </DetailsContainer>
    </PeopleProfileCardContainer>
  );
};

export default React.memo(PeopleProfileCard);
