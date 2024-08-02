import styled from 'styled-components/native';
import {TextInput} from 'react-native';

export const Input = styled(TextInput)`
  height: 45px;
  margin-bottom: 12px;
  padding-horizontal: 8px;
  color: ${({theme}) => theme.colors.black};
  background-color: ${({theme}) => theme.colors.white};
  border-radius: 5px;
  border-width: 0;
`;
