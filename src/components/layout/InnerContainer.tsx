import {View} from 'react-native';
import styled from 'styled-components/native';

export const InnerContainer = styled(View)`
  flex: 1;
  background-color: ${({theme}) => theme.colors.primary};
  justify-content: center;
  align-itmes: center;
  padding: ${({theme}) => theme.space.xl};
`;
