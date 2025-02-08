import styled from 'styled-components/native';

export type SectionDescriptionProps = {
  variant?: 'primary' | 'secondary' | 'tertiary' | 'warning';
};

export const Description = styled.Text<SectionDescriptionProps>`
  color: ${({ theme, variant }) =>
    variant === 'warning' ? theme.colors.error : theme.colors.white};
  font-size: ${({ theme }) => theme.fontSizes.sectionText};
  font-weight: bold;
  margin-top: 0px;
  text-align: center;
`;
