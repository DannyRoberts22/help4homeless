/**
 * @format
 */
import './ignoreWarnings';
import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import {PersistGate} from 'redux-persist/integration/react';
import {Provider} from 'react-redux';
import {store, persistor} from './src/store/store';
import {Navigation} from './src/infrastructure/navigation/root-navigator';
import {ThemeProvider} from 'styled-components';
import {theme} from './src/theme';
import CustomStatusBar from './src/components/layout/CustomStatusBar';
import SplashScreen from 'react-native-splash-screen';

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
            <Navigation />
          </PersistGate>
        </Provider>
      </ThemeProvider>
    </>
  );
}

export default App;
