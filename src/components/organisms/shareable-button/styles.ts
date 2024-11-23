import {styled} from 'styled-components/native';
import {Text} from 'react-native';

type ButtonTextProps = {
  color?: string;
};

export const ButtonText = styled(Text)<ButtonTextProps>`
  font-size: ${({theme}) => theme.fontSizes.buttonText};
  font-weight: bold;
  color: ${({theme, color}) =>
    color ? theme.colors[color] : theme.colors.white};
  text-align: center;
`;
