import styled from 'styled-components/native';

export const SubheadingText = styled.Text`
  font-size: ${({theme}) => theme.fontSizes.subheading};
  font-weight: bold;
  color: ${({theme}) => theme.colors.white};
  text-align: center;
  margin-bottom: ${({theme}) => theme.space.sm};
`;
