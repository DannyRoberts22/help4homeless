import {SafeAreaView} from 'react-native';
import styled from 'styled-components/native';

export const SafeAreaViewStatus = styled(SafeAreaView)<{
  keyboardShouldPersistTaps?: string;
}>`
  flex: 1;
  background-color: ${({theme}) => theme.colors.primary};
`;
