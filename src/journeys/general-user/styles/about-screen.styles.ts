import styled from 'styled-components/native';

export const SectionTitle = styled.Text`
  font-size: ${({theme}) => theme.fontSizes.sectionTitle};
  font-weight: bold;
  color: ${({theme}) => theme.colors.white};
  text-align: center;
  margin-bottom: ${({theme}) => theme.space.sm};
`;

export const Content = styled.Text`
  font-size: ${({theme}) => theme.fontSizes.sectionText};
  color: ${({theme}) => theme.colors.white};
  text-align: center;
  margin-bottom: ${({theme}) => theme.space.lg};
`;

export const HowToUseButton = styled.Text`
  font-size: ${({theme}) => theme.fontSizes.buttonText};
  font-weight: bold;
  color: ${({theme}) => theme.colors.white};
  text-align: center;
`;
