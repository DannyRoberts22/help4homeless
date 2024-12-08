import {styled} from 'styled-components/native';

export const DonationAmount = styled.Text`
  font-size: ${({theme}) => theme.fontSizes.donationTitle};
  padding-top: 16px;
  padding-bottom: 16px;
  color: ${({theme}) => theme.colors.white};
  font-weight: bold;
  text-align: center;
`;
