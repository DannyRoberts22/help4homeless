import {Text} from 'react-native';
import styled from 'styled-components/native';

export const LinkText = styled(Text)`
  margin-top: ${({theme}) => theme.space.sm};
  align-items: center;
  color: ${({theme}) => theme.colors.white};
  font-size: ${({theme}) => theme.fontSizes.cardText};
  text-align: center;
  font-weight: bold;
`;
