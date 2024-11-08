import {styled} from 'styled-components/native';

export const DonationAmount = styled.Text`
  fontsize: ${({theme}) => theme.fontSizes.subheading};
  padding-top: 16;
  padding-bottom: 16;
  color: ${({theme}) => theme.colors.white};
  font-weight: bold;
  text-align: center;
`;
