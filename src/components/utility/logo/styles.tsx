import { isIpad } from '@src/constants/constants';
import FastImage from 'react-native-fast-image';
import { styled } from 'styled-components/native';

export const Logo = styled(FastImage)`
  height: ${isIpad ? '268px' : '124px'};
  width: ${isIpad ? '248px' : '136px'};
  justify-self: center;
`;
