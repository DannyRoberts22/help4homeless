import { Image } from 'react-native';
import { styled } from 'styled-components/native';

import { CardContainer } from '@src/components/molecules/card-components/styles';

export const PeopleProfileCardContainer = styled(CardContainer)`
  min-height: 140px;
  width: 100%;
  flex-direction: row;
  align-items: center;
  padding: 8px;
  margin-bottom: 0px;
  background-color: ${({ theme }) => theme.colors.cardBackground};
  border-radius: 32px;
`;

export const ProfileImage = styled(Image)`
  width: 100px;
  height: 100%;
`;

export const DonationTotal = styled.Text`
  color: white;
  font-weight: bold;
  margin-top: 8px;
`;

export const DonateAgain = styled.Text`
  color: white;
  font-weight: bold;
  margin-top: 8px;
`;
