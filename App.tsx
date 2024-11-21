/**
 * @format
 */
import 'react-native-gesture-handler';
import React from 'react';
import {Navigation} from './src/infrastructure/navigation/root-navigator';
import {ThemeProvider} from 'styled-components';
import {theme} from './src/theme';
import CustomStatusBar from './src/components/layout/CustomStatusBar';
import ScreenHeader from './src/components/utility/screen-header/ScreenHeader';

function App(): JSX.Element {
  return (
    <>
      <ThemeProvider theme={theme}>
        <CustomStatusBar />
        <ScreenHeader />
        <Navigation />
      </ThemeProvider>
    </>
  );
}

export default App;
