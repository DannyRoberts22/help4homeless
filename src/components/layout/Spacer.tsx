import { View } from 'react-native';
import styled from 'styled-components/native';

export const Spacer = styled(View)<{
  size: string;
}>`
  height: ${({ size }): string => size};
`;
