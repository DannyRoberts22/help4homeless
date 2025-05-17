import { View } from 'react-native';
import styled from 'styled-components/native';
import { isIpad } from '@src/constants/constants';

export const InnerContainer = styled(View)`
  flex: 1;
  width: ${({ theme }) =>
    isIpad ? theme.screenSizes.ipadWidth : theme.screenSizes.mobileWidth};
  background-color: ${({ theme }) => theme.colors.primary};
  padding: ${({ theme }) => theme.space.md};
  justify-content: center;
  align-self: center;
`;
