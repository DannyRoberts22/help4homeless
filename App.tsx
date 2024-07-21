/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import 'react-native-gesture-handler';
import React from 'react';
import {Navigation} from './src/infrastructure/navigation/root-navigator';
import {Platform, StatusBar} from 'react-native';
import {ThemeProvider} from 'styled-components';
import {theme} from './src/theme';
import CustomStatusBar from './src/components/layout/CustomStatusBar';
function App(): JSX.Element {
  return (
    <>
      <ThemeProvider theme={theme}>
        {/* {Platform.OS === 'ios' ? (
          <StatusBar backgroundColor="green" barStyle="light-content" />
        ) : undefined} */}
        <CustomStatusBar />
        <Navigation />
      </ThemeProvider>
    </>
  );
}

export default App;
