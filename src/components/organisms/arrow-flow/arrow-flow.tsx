import {theme} from '@src/theme';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {ArrowFlowContainer, ArrowFlowLabel} from './arrow-flow.styles';

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
      <Icon
        name="arrow-down"
        size={theme.imageSizing.md}
        color={theme.colors.white}
      />
    </ArrowFlowContainer>
  );
};

export default ArrowFlow;
