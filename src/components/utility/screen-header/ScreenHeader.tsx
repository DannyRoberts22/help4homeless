import React from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import { Logo } from '@src/components/utility/logo/logo';
import { theme } from '@src/theme';

import {
  AccountContainer,
  CloseIcon,
  ScreenHeaderView,
  TouchableCloseButton,
} from './styles';
import { isIpad } from '@src/constants/constants';

const ScreenHeader = ({
  openDrawer,
  isModal,
  handleClose,
}: {
  openDrawer?: () => void;
  isModal?: boolean;
  handleClose?: () => void;
}) => {
  return (
    <ScreenHeaderView>
      {!isModal && (
        <AccountContainer>
          <TouchableOpacity onPress={openDrawer}>
            <Icon
              name="user"
              size={isIpad ? 48 : 24}
              color={theme.colors.white}
            />
          </TouchableOpacity>
        </AccountContainer>
      )}
      <Logo />
      {isModal && (
        <TouchableCloseButton onPress={handleClose}>
          <CloseIcon>X</CloseIcon>
        </TouchableCloseButton>
      )}
    </ScreenHeaderView>
  );
};

export default ScreenHeader;
