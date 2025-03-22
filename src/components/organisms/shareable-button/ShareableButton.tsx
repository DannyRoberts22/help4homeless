import React from 'react';
import { TouchableOpacity } from 'react-native';

import { ButtonText, TouchableButton } from './styles';

export const ShareableButton = ({
  handler,
  text,
  color,
  disabled,
}: {
  handler: () => void;
  text: string;
  color?: string;
  disabled?: boolean;
}) => {
  return (
    <TouchableButton
      onPress={handler}
      disabled={disabled}
      style={{ padding: 10 }}
    >
      <ButtonText color={color}>{text}</ButtonText>
    </TouchableButton>
  );
};
