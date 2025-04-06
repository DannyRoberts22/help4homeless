import { Text } from 'react-native';
import { styled } from 'styled-components/native';

export const InputTextLabel = styled(Text)`
  color: ${({ theme }) => theme.colors.white};
  padding-vertical: 10px;
  font-size: ${({ theme }) => theme.fontSizes.inputTextLabel};
  font-weight: bold;
`;
