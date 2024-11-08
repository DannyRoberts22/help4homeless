import React, {FC} from 'react';
import {TouchableOpacity} from 'react-native';
import {ButtonText} from './styles';

export const ShareableButton = ({
  handler,
  text,
}: {
  handler: () => void;
  text: String;
}) => {
  return (
    <TouchableOpacity onPress={handler}>
      <ButtonText>{text}</ButtonText>
    </TouchableOpacity>
  );
};
