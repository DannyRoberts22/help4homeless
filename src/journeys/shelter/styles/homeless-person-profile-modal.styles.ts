import { isIpad } from '@src/constants/constants';
import { styled } from 'styled-components/native';

export const ProfileContainer = styled.View`
  border-width: 80px;
  border-color: blue;
  background-color: white;
`;

export const HomelessPersonProfileImage = styled.Image`
  height: ${isIpad ? '363px' : '224px'};
  border-radius: ${({ theme }) => theme.borderRadius};
  align-self: center;
  aspect-ratio: 1;
`;
