import styled from 'styled-components/native';
import {TextInput} from 'react-native';

type StyledTextInputProps = {
  showError?: boolean;
};

export const StyledTextInput = styled(TextInput)<StyledTextInputProps>`
  height: 45px;
  margin-bottom: 12px;
  padding-horizontal: ${({theme}) => theme.space.md};
  color: ${({theme}) => theme.colors.black};
  background-color: ${({theme}) => theme.colors.white};
  border-radius: 5px;
  border-width: ${({showError}) => (showError ? 2 : 0)};
  border-color: ${({showError, theme}) =>
    showError ? theme.colors.error : 'transparent'};
`;
