import env from 'react-native-config';

export const fetchPaymentSheetParams = async ({
  amount,
}: {
  amount: number;
}) => {
  //TODO: Think about utilising this https for production
  // if (Platform.OS === 'ios') {
  //   global.XMLHttpRequest =
  //     global.originalXMLHttpRequest || global.XMLHttpRequest;
  //   global.FormData = global.originalFormData || global.FormData;
  // }

  try {
    const response = await fetch(
      `https://help4homelessbackend-production.up.railway.app/payment-sheet`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${env.STRIPE_TEST_SECRET_KEY}`,
        },
        body: JSON.stringify({
          amount,
        }),
      },
    );
    console.log('🚀 ~ response:', response);

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
