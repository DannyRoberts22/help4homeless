import {styled} from 'styled-components/native';
import {CardContainer} from '@src/components/molecules/card-components/styles';
import {Image} from 'react-native';

export const PeopleProfileCardContainer = styled(CardContainer)`
  flex-direction: row;
  align-items: center;
  flex: 1;
  margin-vertical: 10px;
`;

export const ProfileImage = styled(Image)`
  width: 100;
  height: 100%;
`;

export const DonationTotal = styled.Text`
  color: white;
  font-weight: bold;
  margin-top: 8px;
`;
