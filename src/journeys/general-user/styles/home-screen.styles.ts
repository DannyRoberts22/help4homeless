import {styled} from 'styled-components/native';
import {View} from 'react-native';

export const HomeContainer = styled(View)`
  flex: 1;
  background-color: ${({theme}) => theme.colors.primary};
  justify-content: center;
`;
