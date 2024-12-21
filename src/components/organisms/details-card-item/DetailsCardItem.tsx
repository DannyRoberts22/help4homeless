import React from 'react';

import {
  CardBackground,
  CardContainer,
  CardText,
} from '@src/components/molecules/card-components/styles';
import Link from '@src/components/utility/link/Link';
import { cardContainerSizing } from '@src/theme/sizing/sizing';
import { ShelterItem } from '@src/types/shelter-api-types';

import { LinkContainer } from '@src/journeys/general-user/styles/home-screen.styles';

export const DetailsCardItem = ({
  item,
  url,
  height,
}: {
  item: ShelterItem;
  url: string | null;
  height: keyof typeof cardContainerSizing;
}) => {
  return (
    <CardContainer height={height}>
      <CardBackground>
        <CardText>{item.name}</CardText>
        <CardText>{item.vicinity}</CardText>
        <CardText>{item.opening_hours?.open_now ? 'Open' : 'Closed'}</CardText>
        {url && (
          <LinkContainer>
            <Link url={url}>Click to View Details</Link>
          </LinkContainer>
        )}
      </CardBackground>
    </CardContainer>
  );
};
