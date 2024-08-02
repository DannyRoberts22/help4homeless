import React from 'react';

import {Logo} from '@src/components/utility/logo/logo';
import * as CSS from './styles';

const ScreenHeader = () => {
  return (
    <CSS.ScreenHeaderView>
      <Logo />
    </CSS.ScreenHeaderView>
  );
};

export default ScreenHeader;
