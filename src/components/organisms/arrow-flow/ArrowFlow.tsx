import {theme} from '@src/theme';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {ArrowFlowContainer, ArrowFlowLabel} from './styles';

const ArrowFlow = () => {
  return (
    <ArrowFlowContainer>
      <ArrowFlowLabel>Scan</ArrowFlowLabel>
      <Icon
        name="arrow-down"
        size={theme.imageSizing.md}
        color={theme.colors.white}
      />
      <ArrowFlowLabel>Donate</ArrowFlowLabel>
      <Icon
        name="arrow-down"
        size={theme.imageSizing.md}
        color={theme.colors.white}
      />
      <ArrowFlowLabel>Help</ArrowFlowLabel>
    </ArrowFlowContainer>
  );
};

export default ArrowFlow;
