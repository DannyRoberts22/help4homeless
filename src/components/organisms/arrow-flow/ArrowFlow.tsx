import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';

import { theme } from '@src/theme';

import {
  ArrowFlowContainer,
  ArrowFlowDescription,
  ArrowFlowTitle,
} from './styles';

type Item = {
  title: string;
  description: string;
};

const ArrowFlow = ({ content }: { content: Item[] }) => {
  return content.map((item, index) => {
    const isLastItem = index === content.length - 1;
    return (
      <ArrowFlowContainer key={`arrow-flow-section-${index}`}>
        <ArrowFlowTitle>{item.title}</ArrowFlowTitle>
        <ArrowFlowDescription>{item.description}</ArrowFlowDescription>
        {!isLastItem && (
          <Icon
            name="arrow-down"
            size={theme.imageSizing.md}
            color={theme.colors.white}
          />
        )}
      </ArrowFlowContainer>
    );
  });
};

export default ArrowFlow;
