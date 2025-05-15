import { SafeAreaView } from 'react-native';
import styled from 'styled-components/native';

export const SafeAreaViewStatus = styled(SafeAreaView)`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.primary};
  justify-content: center;
  align-items: center;
`;
