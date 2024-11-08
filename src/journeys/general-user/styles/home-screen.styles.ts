import {styled} from 'styled-components/native';
import {theme} from '@src/theme';

export const HorizontalFlatListContainer = styled.View`
  height: 200px;
`;

export const LinkContainer = styled.View`
  padding-bottom: ${theme.space.sm};
  align-items: center;
`;

export const ShelterSearchContainer = styled.View`
  padding-horizontal: ${({theme}) => theme.space.md};
`;
