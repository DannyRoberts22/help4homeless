import React from 'react';

import {Logo} from '@src/components/utility/logo/logo';
import {ScreenHeaderView} from './styles';
import {Button, Text, TouchableOpacity, View} from 'react-native';
import {theme} from '@src/theme';

const ScreenHeader = ({
  isModal,
  handleClose,
}: {
  isModal?: boolean;
  handleClose?: () => void;
}) => {
  return (
    <ScreenHeaderView>
      <Logo />
      {isModal && (
        <TouchableOpacity
          onPress={handleClose}
          style={{
            position: 'absolute',
            right: 16, // Adjust as needed
            padding: 10,
          }}>
          <Text
            style={{
              color: theme.colors.white,
              fontSize: 24,
              fontWeight: 'bold',
            }}>
            X
          </Text>
        </TouchableOpacity>
      )}
    </ScreenHeaderView>
  );
};

export default ScreenHeader;
