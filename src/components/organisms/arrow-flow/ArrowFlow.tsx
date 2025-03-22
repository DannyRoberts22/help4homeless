import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';

import { theme } from '@src/theme';

import { ArrowFlowContainer } from './styles';
import SectionDescription from '@src/components/molecules/section-description/SectionDescription';
import SectionTitle from '@src/components/molecules/section-title/SectionTitle';
import { Spacer } from '@src/components/layout/Spacer';

type Item = {
  title: string;
  description: string;
};

const ArrowFlow = ({ content }: { content: Item[] }) => {
  return content.map((item, index) => {
    const isLastItem = index === content.length - 1;
    return (
      <ArrowFlowContainer key={`arrow-flow-section-${index}`}>
        <SectionTitle>{item.title}</SectionTitle>
        <SectionDescription>{item.description}</SectionDescription>
        <Spacer size={theme.space.md} />
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
