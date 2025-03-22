import React from 'react';
import { KeyboardTypeOptions } from 'react-native';

import InputTextLabel from '../input-text-label/InputTextLabel.tsx';
import { StyledTextInput } from './styles.ts';

type TextInputProps = {
  placeholder: string;
  secureTextEntry?: boolean;
  keyboardType?: KeyboardTypeOptions;
  value?: string | number;
  onChangeText?: (text: string) => void;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  autoCorrect?: boolean;
  errorText?: string;
  showError?: boolean;
  autoFocus?: boolean;
};
const TextInput = ({
  placeholder,
  secureTextEntry = false,
  keyboardType = 'default',
  autoCapitalize = 'none',
  autoCorrect = false,
  onChangeText,
  errorText,
  showError,
  autoFocus,
}: TextInputProps) => {
  return (
    <>
      <StyledTextInput
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
        autoCorrect={autoCorrect}
        onChangeText={onChangeText}
        showError={showError}
        autoFocus={autoFocus}
      />
      {showError && errorText && <InputTextLabel text={errorText} />}
    </>
  );
};

export default TextInput;
