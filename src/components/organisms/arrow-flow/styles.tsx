import {styled} from 'styled-components/native';

export const ArrowFlowLabel = styled.Text`
  color: ${({theme}) => theme.colors.white};
  font-size: ${({theme}) => theme.fontSizes.arrowLabel};
  font-weight: bold;
  margin-vertical: 20px;
`;

export const ArrowFlowContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
