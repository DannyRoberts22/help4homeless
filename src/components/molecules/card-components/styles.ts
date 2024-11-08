import {styled} from 'styled-components/native';
import {ImageBackground, ImageProps, Text} from 'react-native';
import {CardProps} from './types';

export const CardContainer = styled.View<CardProps>`
  width: ${({cardWidth}) => (cardWidth ? cardWidth : '90%')};
  margin-horizontal: 10px;
  border-radius: ${({theme}) => theme.borderRadiusSizing.md}px;
  overflow: hidden;
  height: ${({height, theme}) => theme.cardContainerSizing[height]}px;
`;
export const CardImageBackground = styled(ImageBackground)<ImageProps>`
  height: 100%;
`;

export const CardBackground = styled.View`
  padding: ${({theme}) => theme.space.md};
  border-radius: ${({theme}) => theme.borderRadiusSizing.md}px;
  background-color: rgba(0, 0, 0, 0.3);
`;

export const CardText = styled(Text)`
  color: ${({theme}) => theme.colors.white};
  font-size: ${({theme}) => theme.fontSizes.cardText};
  text-align: center;
  font-weight: bold;
`;

export const TitleContainer = styled.View`
  background-color: rgba(0, 0, 0, 0.5);
  padding: 10px;
  max-height: 100px;
`;
export const DetailsContainer = styled.View`
  background-color: rgba(0, 0, 0, 0.5);
  padding: 10px;
  height: 100%;
  flex: 2;
`;

export const Title = styled.Text`
  color: white;
  font-size: 18px;
  font-weight: bold;
`;
