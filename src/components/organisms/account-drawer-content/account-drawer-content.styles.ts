import {ShareableButton} from '@src/components/organisms/shareable-button/ShareableButton';
import {styled} from 'styled-components/native';

export const SignOutButton = styled(ShareableButton)``;

export const AccountDrawerContentContainer = styled.View`
  flex: 1;
  background-color: ${({theme}) => theme.colors.primary};
  margin-top: ${({theme}) => theme.space.xl};
`;
