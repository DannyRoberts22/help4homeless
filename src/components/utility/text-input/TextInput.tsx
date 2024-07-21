import React from 'react';
import * as CSS from './styles.ts';
import {KeyboardTypeOptions} from 'react-native';

type TextInputProps = {
  placeholder: string;
  secureTextEntry?: boolean;
  keyboardType?: KeyboardTypeOptions;
};
const TextInput = ({
  placeholder,
  secureTextEntry = false,
  keyboardType = 'default',
}: TextInputProps) => {
  return (
    <CSS.Input
      placeholder={placeholder}
      secureTextEntry={secureTextEntry}
      keyboardType={keyboardType}
    />
  );
};

export default TextInput;
