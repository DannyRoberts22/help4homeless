import { isIpad } from '@src/constants/constants';
import { TextInput } from 'react-native';
import styled from 'styled-components/native';

type StyledTextInputProps = {
  showError?: boolean;
};

export const StyledTextInput = styled(TextInput)<StyledTextInputProps>`
  height: ${isIpad ? '66px' : '44px'};
  font-size: ${({ theme }) => theme.fontSizes.inputTextLabel};
  margin-bottom: 12px;
  padding-horizontal: ${({ theme }) => theme.space.md};
  color: ${({ theme }) => theme.colors.black};
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 5px;
  border-width: ${({ showError }) => (showError ? 2 : 0)}px;
  border-color: ${({ showError, theme }) =>
    showError ? theme.colors.error : 'transparent'};
`;
