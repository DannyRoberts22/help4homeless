import styled from 'styled-components/native';

export const Description = styled.Text`
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.fontSizes.sectionText};
  font-weight: bold;
  margin-top: 0px;
  text-align: center;
`;
