import { View } from 'react-native';
import styled from 'styled-components/native';

export const InnerContainer = styled(View)`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.primary};
  padding: ${({ theme }) => theme.space.md};
  justify-content: center;
`;
