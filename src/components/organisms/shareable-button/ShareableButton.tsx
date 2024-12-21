import React from 'react';
import { TouchableOpacity } from 'react-native';

import { ButtonText } from './styles';

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
    <TouchableOpacity onPress={handler} disabled={disabled}>
      <ButtonText color={color}>{text}</ButtonText>
    </TouchableOpacity>
  );
};
