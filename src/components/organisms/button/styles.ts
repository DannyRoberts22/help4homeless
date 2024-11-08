import {styled} from 'styled-components/native';

export const ButtonText = styled.Text`
  font-size: ${({theme}) => theme.fontSizes.buttonText};
  font-weight: bold;
  color: ${({theme}) => theme.colors.white};
  text-align: center;
`;
