import React from 'react';

import {
  CardContainer,
  CardImageBackground,
  Title,
  TitleContainer,
} from '@src/components/molecules/card-components/styles';
import { cardContainerSizing } from '@src/theme/sizing/sizing';
import { MappedItem } from '@src/types/news-api-types';

export const ImageBackgroundCard = ({
  cardWidth,
  item,
  height,
}: {
  cardWidth: number;
  item: MappedItem;
  height: keyof typeof cardContainerSizing;
}) => {
  return (
    <CardContainer cardWidth={cardWidth} height={height}>
      <CardImageBackground source={{ uri: item.urlToImage }}>
        <TitleContainer>
          <Title>{item.title}</Title>
        </TitleContainer>
      </CardImageBackground>
    </CardContainer>
  );
};
