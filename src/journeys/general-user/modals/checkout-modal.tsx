import React from 'react';
import { InnerContainer } from '@src/components/layout/InnerContainer';
import { SafeAreaViewStatus } from '@src/components/layout/SafeAreaViewStatus';
import { ShareableButton } from '@src/components/organisms/shareable-button/ShareableButton';
import { useEffect, useState } from 'react';
import {
  useStripe,
  CardField,
  CardFieldInput,
} from '@stripe/stripe-react-native';
import { ActivityIndicator, Alert, Platform } from 'react-native';
import env from 'react-native-config';
import { theme } from '@src/theme';

export const CheckoutModal = () => {
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const [loading, setLoading] = useState(false);

  const fetchPaymentSheetParams = async () => {
    if (Platform.OS === 'ios') {
      global.XMLHttpRequest =
        global.originalXMLHttpRequest || global.XMLHttpRequest;
      global.FormData = global.originalFormData || global.FormData;
    }

    try {
      const response = await fetch(`http://localhost:5000/payment-sheet`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${env.STRIPE_TEST_SECRET_KEY}`,
        },
        body: JSON.stringify({
          amount: 2099,
        }),
      });

      if (!response.ok) {
        const errorDetails = await response.json();
        console.error('Error fetching payment sheet:', {
          status: response.status,
          statusText: response.statusText,
          errorDetails,
        });
        throw new Error(
          `Failed to fetch payment sheet: ${response.status} ${response.statusText}`,
        );
      }

      const { paymentIntent, ephemeralKey, customer } = await response.json();
      console.log('Payment sheet params:', {
        paymentIntent,
        ephemeralKey,
        customer,
      });
      return {
        paymentIntent,
        ephemeralKey,
        customer,
      };
    } catch (error) {
      console.error('Error in checkout-modal:', error);
      throw error;
    }
  };

  const initializePaymentSheet = async () => {
    try {
      const { paymentIntent, ephemeralKey, customer } =
        await fetchPaymentSheetParams();

      const { error } = await initPaymentSheet({
        merchantDisplayName: 'Example, Inc.',
        customerId: customer,
        customerEphemeralKeySecret: ephemeralKey,
        paymentIntentClientSecret: paymentIntent,
        returnURL: 'helpapp://stripe-redirect',
        allowsDelayedPaymentMethods: true,
        defaultBillingDetails: {
          name: 'Jane Doe',
        },
      });

      if (error) {
        console.error('Error initializing payment sheet:', error);
        Alert.alert('Error', 'Failed to initialize payment sheet.');
        return;
      }

      setLoading(true); // Set loading to true only if initialization succeeds
      console.log('Payment sheet initialized successfully');
    } catch (error) {
      console.error('Error in initializePaymentSheet:', error);
      Alert.alert('Error', 'Failed to initialize payment sheet.');
    }
  };

  const openPaymentSheet = async () => {
    const response = await presentPaymentSheet();

    if (response.error?.code === 'Canceled') {
      Alert.alert('Payment canceled', 'Your payment was canceled.');
    } else if (response.error) {
      console.error('Error presenting payment sheet:', response.error);
      Alert.alert(`Error code: response.error.message`);
    }
  };

  useEffect(() => {
    initializePaymentSheet();
  }, []);

  return (
    <SafeAreaViewStatus>
      <InnerContainer>
        {loading ? (
          <ShareableButton
            text="Checkout"
            handler={openPaymentSheet}
            disabled={!loading}
          />
        ) : (
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
        )}
      </InnerContainer>
    </SafeAreaViewStatus>
  );
};
