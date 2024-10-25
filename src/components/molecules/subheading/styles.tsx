import styled from 'styled-components/native';
import {theme} from '../../../theme';

export const SubheadingText = styled.Text`
  font-size: ${theme.fontSizes.subheading};
  font-weight: bold;
  color: ${theme.colors.white};
  text-align: center;
  margin-bottom: ${theme.space.sm};
`;
