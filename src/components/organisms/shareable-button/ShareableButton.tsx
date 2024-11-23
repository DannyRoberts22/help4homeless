import React from 'react';
import {TouchableOpacity} from 'react-native';
import {ButtonText} from './styles';

export const ShareableButton = ({
  handler,
  text,
  color,
}: {
  handler: () => void;
  text: string;
  color?: string;
}) => {
  return (
    <TouchableOpacity onPress={handler}>
      <ButtonText color={color}>{text}</ButtonText>
    </TouchableOpacity>
  );
};
