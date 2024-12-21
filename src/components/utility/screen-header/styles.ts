import { Text, TouchableOpacity, View } from 'react-native';
import { styled } from 'styled-components/native';

export const ScreenHeaderView = styled(View)`
  flex-direction: row;
  height: 65px;
  background-color: ${({ theme }) => theme.colors.primary};
  justify-content: center;
  align-items: center;
  padding-horizontal: 16px;
`;

export const ScreenTitle = styled(Text)`
  font-weight: bold;
  font-size: ${({ theme }) => theme.fontSizes.screenHeader};
  color: ${({ theme }) => theme.colors.white};
  text-align: center;
`;

export const TouchableCloseButton = styled(TouchableOpacity)`
  position: absolute;
  right: 16px;
  padding: 10px;
`;

export const CloseIcon = styled(Text)`
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.fontSizes.closeIcon};
  font-weight: bold;
`;

export const AccountContainer = styled(View)`
  position: absolute;
  left: 16px;
  padding-horizontal: 10px;
`;
