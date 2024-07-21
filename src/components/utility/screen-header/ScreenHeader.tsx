import React from 'react';

import {Logo} from '@src/components/utility/logo/logo';
import * as CSS from './styles';

const ScreenHeader = () => {
  return (
    <CSS.ScreenHeaderView>
      {/* <> */}
      <Logo />
      {/* <CSS.ScreenTitle>HELP</CSS.ScreenTitle> */}
      {/* </> */}
    </CSS.ScreenHeaderView>
  );
};

export default ScreenHeader;
