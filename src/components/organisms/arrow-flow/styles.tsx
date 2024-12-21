import { styled } from 'styled-components/native';

export const ArrowFlowTitle = styled.Text`
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.fontSizes.arrowFlowTitle};
  font-weight: bold;
  margin-vertical: 20px;
  text-align: center;
`;

export const ArrowFlowDescription = styled(ArrowFlowTitle)`
  font-size: ${({ theme }) => theme.fontSizes.arrowFlowDescription};
  margin-top: 0px;
  text-align: center;
`;

export const ArrowFlowContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
