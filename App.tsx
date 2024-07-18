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

function App(): JSX.Element {
  return (
    <>
      <ThemeProvider theme={theme}>
        {Platform.OS === 'ios' ? (
          <StatusBar barStyle="dark-content" />
        ) : undefined}
        <Navigation />
      </ThemeProvider>
    </>
  );
}

export default App;
