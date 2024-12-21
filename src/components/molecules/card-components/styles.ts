import { ImageBackground, ImageProps, Text } from 'react-native';
import { styled } from 'styled-components/native';

import { CardProps } from './types';

export const CardContainer = styled.View<CardProps>`
  width: ${({ cardWidth }) => (cardWidth ? `${cardWidth}px` : '90%')};
  margin-horizontal: 10px;
  border-radius: ${({ theme }) => theme.borderRadiusSizing.md}px;
  overflow: hidden;
  height: ${({ height, theme }) => theme.cardContainerSizing[height]}px;
`;
export const CardImageBackground = styled(ImageBackground)<ImageProps>`
  height: 100%;
`;

export const CardBackground = styled.View`
  padding: ${({ theme }) => theme.space.md};
  border-radius: ${({ theme }) => theme.borderRadiusSizing.md}px;
  background-color: rgba(0, 0, 0, 0.7);
`;

export const CardText = styled(Text)`
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.fontSizes.cardText};
  text-align: center;
  font-weight: bold;
`;

export const TitleContainer = styled.View`
  background-color: rgba(0, 0, 0, 0.85);
  padding: 10px;
  max-height: 100px;
`;
export const DetailsContainer = styled.View`
  background-color: rgba(0, 0, 0, 0.5);
  height: 100%;
  flex: 2;
  padding: 8px;
`;

export const Title = styled.Text`
  color: white;
  font-size: 14px;
  font-weight: 600;
`;
