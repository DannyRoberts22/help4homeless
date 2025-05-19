import { Text, TouchableOpacity, View } from 'react-native';
import { styled } from 'styled-components/native';

import { isIpad } from '@src/constants/constants';

export const ScreenHeaderView = styled(View)`
  flex-direction: row;
  height: ${isIpad ? '106px' : '84px'};
  background-color: ${({ theme }) => theme.colors.primary};
  justify-content: center;
  align-items: center;
  padding-vertical: ${isIpad ? '28px' : '16px'};
`;

export const ScreenTitle = styled(Text)`
  font-weight: bold;
  font-size: ${({ theme }) => theme.fontSizes.screenHeader};
  color: ${({ theme }) => theme.colors.white};
  text-align: center;
`;

export const TouchableCloseButton = styled(TouchableOpacity)`
  position: absolute;
  right: ${isIpad ? '125px' : '16px'};
  padding-horizontal: 10px;
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
