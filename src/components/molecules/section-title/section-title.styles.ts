import styled from 'styled-components/native';

export const Title = styled.Text`
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.fontSizes.sectionTitle};
  font-weight: bold;
  margin-vertical: 20px;
  text-align: center;
`;
