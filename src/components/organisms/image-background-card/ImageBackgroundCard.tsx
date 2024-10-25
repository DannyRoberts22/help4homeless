import React from 'react';
import {
  CardContainer,
  CardImageBackground,
  DetailsContainer,
  Title,
} from '@src/components/molecules/card-components/style';
import {MappedItem} from '@src/types/news-api-types';

export const ImageBackgroundCard = ({
  cardWidth,
  item,
}: {
  cardWidth: number;
  item: MappedItem;
}) => {
  return (
    <CardContainer cardWidth={cardWidth} height="lg">
      <CardImageBackground source={{uri: item.urlToImage}}>
        <DetailsContainer>
          <Title>{item.title}</Title>
        </DetailsContainer>
      </CardImageBackground>
    </CardContainer>
  );
};
