/**
 * @format
 */
import 'react-native-gesture-handler';
import React from 'react';
import {PersistGate} from 'redux-persist/integration/react';
import {Provider} from 'react-redux';
import {store, persistor} from './src/store/store';
import {Navigation} from './src/infrastructure/navigation/root-navigator';
import {ThemeProvider} from 'styled-components';
import {theme} from './src/theme';
import CustomStatusBar from './src/components/layout/CustomStatusBar';
import ScreenHeader from './src/components/utility/screen-header/ScreenHeader';

function App(): JSX.Element {
  return (
    <>
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <CustomStatusBar />
            <ScreenHeader />
            <Navigation />
          </PersistGate>
        </Provider>
        <CustomStatusBar />
        <ScreenHeader />
        <Navigation />
      </ThemeProvider>
    </>
  );
}

export default App;
