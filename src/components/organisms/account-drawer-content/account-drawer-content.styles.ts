import { styled } from 'styled-components/native';

import { ShareableButton } from '@src/components/organisms/shareable-button/ShareableButton';

export const SignOutButton = styled(ShareableButton)``;

export const AccountDrawerContentContainer = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.primary};
  margin-top: ${({ theme }) => theme.space.xl};
`;
