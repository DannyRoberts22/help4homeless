import { Dimensions, Platform, View } from 'react-native';
import styled from 'styled-components/native';

const { width, height } = Dimensions.get('window');
const isIpad = Platform.OS === 'ios' && Math.min(width, height) >= 768;

export const InnerContainer = styled(View)`
  flex: 1;
  width: ${({ theme }) =>
    isIpad ? theme.screenSizes.ipadWidth : theme.screenSizes.mobileWidth};
  background-color: ${({ theme }) => theme.colors.primary};
  padding: ${({ theme }) => theme.space.md};
  justify-content: center;
`;
