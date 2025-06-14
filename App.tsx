/**
 * @format
 */
import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, Linking, StatusBar } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { ThemeProvider } from 'styled-components';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { StripeProvider, useStripe } from '@stripe/stripe-react-native';
import env from 'react-native-config';

import CustomStatusBar from './src/components/layout/CustomStatusBar';
import { Navigation } from './src/navigation/root-navigator';
import { persistor, store } from './src/store/store';
import { theme } from './src/theme';

import './ignoreWarnings';
import 'react-native-gesture-handler';

function App(): JSX.Element | null {
  const [publishableKey, setPublishableKey] = useState('');

  const { handleURLCallback } = useStripe();

  useEffect(() => {
    if (env.STRIPE_TEST_PUBLISHABLE_KEY) {
      setPublishableKey(env.STRIPE_TEST_PUBLISHABLE_KEY);
    } else {
      console.error('Stripe publishable key is missing!');
    }
  }, [env.STRIPE_PUBLISHABLE_KEY]);

  useEffect(() => {
    SplashScreen.hide();
    GoogleSignin.configure({
      webClientId:
        '668406264664-309dqgin9eu0ump3bii23a7tv5c3slu4.apps.googleusercontent.com', // Get this from Firebase
      offlineAccess: true,
    });
  }, []);

  const handleDeepLink = useCallback(
    async (url: string | null) => {
      if (url) {
        console.log('🚀 ~ url:', url);
        const stripeHandled = await handleURLCallback(url);
        if (stripeHandled) {
          // This was a Stripe URL - you can return or add extra handling here as you see fit
        } else {
          // This was NOT a Stripe URL – handle as you normally would
        }
      }
    },
    [handleURLCallback],
  );

  useEffect(() => {
    const getUrlAsync = async () => {
      const initialUrl = await Linking.getInitialURL();
      console.log('🚀 ~ getUrlAsync ~ initialUrl:', initialUrl);
    };

    getUrlAsync();

    const deepLinkListener = Linking.addEventListener(
      'url',
      (event: { url: string }) => {
        handleDeepLink(event.url);
      },
    );

    return () => deepLinkListener.remove();
  }, [handleDeepLink]);

  return (
    <>
      {!publishableKey ? (
        <ThemeProvider theme={theme}>
          <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
              <CustomStatusBar />
              <StatusBar hidden={true} />
              <ActivityIndicator
                size="large"
                color={theme.colors.white}
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: theme.colors.primary,
                }}
              />
            </PersistGate>
          </Provider>
        </ThemeProvider>
      ) : (
        <StripeProvider
          publishableKey={publishableKey}
          merchantIdentifier="org.HelpForHomeless.app" // TODO get merchant id for apple pay
          urlScheme="helpapp://" // required for 3D Secure and bank redirects
        >
          <ThemeProvider theme={theme}>
            <Provider store={store}>
              <PersistGate loading={null} persistor={persistor}>
                <CustomStatusBar />
                <StatusBar hidden={true} />
                <Navigation />
              </PersistGate>
            </Provider>
          </ThemeProvider>
        </StripeProvider>
      )}
    </>
  );
}

export default App;
