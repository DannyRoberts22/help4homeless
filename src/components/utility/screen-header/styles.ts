import {Text, View} from 'react-native';
import {styled} from 'styled-components/native';

export const ScreenHeaderView = styled(View)`
  flex-direction: row;
  height: 65px;
  background-color: ${({theme}) => theme.colors.primary};
  justify-content: center;
  align-items: center;
`;

export const ScreenTitle = styled(Text)`
  font-weight: bold;
  font-size: ${({theme}) => theme.fontSizes.screenHeader};
  color: ${({theme}) => theme.colors.white};
  text-align: center;
`;
