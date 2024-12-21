import React, { Fragment } from 'react';
import { SafeAreaView, StatusBar } from 'react-native';

import { theme } from '@src/theme';

export default function CustomStatusBar({ children }: any) {
  return (
    <Fragment>
      <StatusBar
        backgroundColor={theme.colors.primary}
        barStyle="light-content"
      />
      <SafeAreaView
        style={{
          flex: 0,
          backgroundColor: theme.colors.primary,
        }}
      >
        {children}
      </SafeAreaView>
    </Fragment>
  );
}
