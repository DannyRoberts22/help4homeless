import {Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {styled} from 'styled-components/native';

export const ScreenHeaderView = styled(View)`
  flex-direction: row;
  height: 65px;
  background-color: ${({theme}) => theme.colors.primary};
  justify-content: center;
  align-items: center;
  padding-horizontal: 16px;
`;

export const ScreenTitle = styled(Text)`
  font-weight: bold;
  font-size: ${({theme}) => theme.fontSizes.screenHeader};
  color: ${({theme}) => theme.colors.white};
  text-align: center;
`;

export const TouchableCloseContainer = styled(TouchableOpacity)`
  position: absolute;
  right: 16;
  padding: 10;
`;
