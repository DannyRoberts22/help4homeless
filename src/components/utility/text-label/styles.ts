import {styled} from 'styled-components/native';
import {Text} from 'react-native';

export const TextLabel = styled(Text)`
  color: ${({theme}) => theme.colors.white};
  padding-vertical: 10px;
  font-size: ${({theme}) => theme.fontSizes.textLabel};
`;
