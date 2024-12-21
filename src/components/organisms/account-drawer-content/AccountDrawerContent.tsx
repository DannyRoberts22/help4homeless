import React from 'react';

import {
  AccountDrawerContentContainer,
  SignOutButton,
} from './account-drawer-content.styles';

type AccountDrawerContentProps = {
  handleSignOut: () => void;
};

export const AccountDrawerContent = ({
  handleSignOut,
}: AccountDrawerContentProps) => {
  return (
    <AccountDrawerContentContainer>
      <SignOutButton
        text="Sign Out"
        //   color="primary"
        handler={handleSignOut}
      />
    </AccountDrawerContentContainer>
  );
};
