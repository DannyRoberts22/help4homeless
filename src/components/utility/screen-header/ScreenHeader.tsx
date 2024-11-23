import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';

import {Logo} from '@src/components/utility/logo/logo';
import {
  AccountContainer,
  CloseIcon,
  ScreenHeaderView,
  TouchableCloseButton,
} from './styles';
import {TouchableOpacity} from 'react-native';
import {theme} from '@src/theme';

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
      <AccountContainer>
        <TouchableOpacity onPress={openDrawer}>
          <Icon name="user" size={24} color={theme.colors.white} />
        </TouchableOpacity>
      </AccountContainer>
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
