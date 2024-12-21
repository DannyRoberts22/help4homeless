/**
 * @format
 */
import React, {useEffect} from 'react';
import {StatusBar} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {ThemeProvider} from 'styled-components';

import CustomStatusBar from './src/components/layout/CustomStatusBar';
import {Navigation} from './src/navigation/root-navigator';
import {persistor, store} from './src/store/store';
import {theme} from './src/theme';

import './ignoreWarnings';
import 'react-native-gesture-handler';

function App(): JSX.Element {
  useEffect(() => {
    SplashScreen.hide();
  }, []);
  return (
    <>
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <CustomStatusBar />
            <StatusBar hidden={true} />
            <Navigation />
          </PersistGate>
        </Provider>
      </ThemeProvider>
    </>
  );
}

export default App;
