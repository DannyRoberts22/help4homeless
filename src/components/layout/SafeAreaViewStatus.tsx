import {StatusBar, SafeAreaView} from 'react-native';
import styled from 'styled-components/native';

export const SafeAreaViewStatus = styled(SafeAreaView)`
  flex: 1;
  ${StatusBar.currentHeight && `margin-top: ${StatusBar.currentHeight}px`};
  background-color: ${({theme}) => theme.colors.primary};
`;
