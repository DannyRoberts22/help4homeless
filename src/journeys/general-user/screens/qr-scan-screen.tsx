import React, { useCallback, useRef, useState } from 'react';
import { ActivityIndicator, Alert, Button, Modal } from 'react-native';
import { RNCamera } from 'react-native-camera';
import QRCodeScanner from 'react-native-qrcode-scanner';

import RNPickerSelect from 'react-native-picker-select';
import { SafeAreaViewStatus } from '@src/components/layout/SafeAreaViewStatus';
import SectionDescription from '@src/components/molecules/section-description/SectionDescription';
import {
  firebaseGetHomelessPersonById,
  firebaseUpdateHomelessPersonBalance,
} from '@src/api/homeless-persons';
import { Spacer } from '@src/components/layout/Spacer';
import { theme } from '@src/theme';
import { useFocusEffect } from '@react-navigation/native';

import {
  FormContainer,
  QRCodeScannerContainer,
  TopContentContainer,
} from '../styles/qr-scan-screen.styles';
import { SectionTitle } from '../styles/about-screen.styles';
import TextInput from '@src/components/utility/text-input/TextInput';
import { ShareableButton } from '@src/components/organisms/shareable-button/ShareableButton';
import { InnerContainer } from '@src/components/layout/InnerContainer';
import { firebasePushPeopleDonation } from '@src/api/people-donations';
import { useStripe } from '@stripe/stripe-react-native';
import { fetchPaymentSheetParams } from '@src/api/handle-payment-services';
import { isIpad } from '@src/constants/constants';

type QrScanScreenProps = {
  route: { params?: { homelessPersonId?: string } };
};
export const QRScanScreen = ({ route: { params } }: QrScanScreenProps) => {
  const [homelessPersonId, setHomelessPersonId] = useState('');
  const [homelessPersonExpiryDate, setHomelessPersonExpiryDate] = useState('');
  const [homelessPersonFirstName, setHomelessPersonFirstName] = useState('');
  const [isQrCodeExpired, setIsQrCodeExpired] = useState(false);
  const [donationAmount, setDonationAmount] = useState('');
  const [donationSubmitted, setDonationSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const processedQrCode = useRef<string | null>(null);

  useFocusEffect(
    useCallback(() => {
      setHomelessPersonFirstName('');
      setIsQrCodeExpired(false);
      setDonationAmount('');
      setDonationSubmitted(false);
    }, []),
  );

  const handleQRCodeRead = ({ data }: { data: string }) => {
    let homelessPersonId = '';
    let expiryDate = '';

    if (data.includes('homelessPersonId=')) {
      const [, queryPart] = data.split('homelessPersonId=');
      [homelessPersonId, expiryDate] = queryPart.split('_');
    } else {
      [homelessPersonId, expiryDate] = data.split('_');
    }

    if (processedQrCode.current === homelessPersonId) {
      return;
    }

    processedQrCode.current = homelessPersonId;

    setHomelessPersonId(homelessPersonId);
    setHomelessPersonExpiryDate(expiryDate);

    const isExpired = Date.now() > Number(expiryDate);

    if (isExpired) {
      setIsQrCodeExpired(true);
      Alert.alert(
        `This QR code has expired. Please ask the person to generate a new one at their shelter.`,
      );
      return;
    }

    if (homelessPersonId && !isExpired) {
      setIsQrCodeExpired(false);
      firebaseGetHomelessPersonById(homelessPersonId).then(person => {
        setHomelessPersonFirstName(person.firstName);
      });
    }
  };

  if (params?.homelessPersonId) {
    handleQRCodeRead({ data: params?.homelessPersonId });
  }
  // const simulateQRScan = () => {
  //   const sevenDaysFromNow = Date.now() + 7 * 24 * 60 * 60 * 1000;
  //   handleQRCodeRead({ data: `Wbq34DqVYSPeV1y2DKcz_${sevenDaysFromNow}` });
  // };

  const initializePaymentSheet = async () => {
    try {
      const { paymentIntent, ephemeralKey, customer } =
        await fetchPaymentSheetParams({ amount: Number(donationAmount) * 100 });

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
        Alert.alert('Error', 'Failed to initialize payment sheet.');
        return;
      }

      setIsLoading(true);
    } catch (error) {
      Alert.alert('Error', 'Failed to initialize payment sheet.');
    }
  };

  const openPaymentSheet = async () => {
    const response = await presentPaymentSheet();

    return response;
  };

  const handleDonation = async () => {
    try {
      await initializePaymentSheet();

      const { error } = await openPaymentSheet();

      if (error) {
        if (error?.code === 'Canceled') {
          setIsLoading(false);
        } else {
          Alert.alert(`Error code: response.error.message`);
          setIsLoading(false);
        }
        return;
      }

      setIsLoading(false);

      await firebaseUpdateHomelessPersonBalance({
        amount: Number(donationAmount) * 100,
        id: homelessPersonId,
        operation: 'donation',
      });

      await firebasePushPeopleDonation({
        amount: Number(donationAmount) * 100,
        name: homelessPersonFirstName,
        id: `${homelessPersonId}_${homelessPersonExpiryDate}`,
      });

      setDonationAmount('');
      setDonationSubmitted(true);
      setHomelessPersonFirstName('');
      setShowSuccessModal(true);
    } catch (error) {
      Alert.alert('Error', 'An unexpected error occurred. Please try again.');
    }
  };

  const handleCancel = () => {
    setHomelessPersonFirstName('');
    setDonationAmount('');
    setIsQrCodeExpired(false);
  };

  if (isLoading) {
    return (
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
    );
  }
  return (
    <>
      <SafeAreaViewStatus>
        <InnerContainer>
          <QRCodeScannerContainer>
            {isQrCodeExpired ? (
              <SectionDescription>
                This QR code has unfortunately expired
              </SectionDescription>
            ) : homelessPersonFirstName ? (
              <>
                {!donationSubmitted && (
                  <>
                    <Spacer size={theme.space.xxl} />
                    <SectionTitle>
                      {`How much would you like to donate to ${homelessPersonFirstName}?`}
                    </SectionTitle>
                    <Spacer size={theme.space.lg} />
                    <FormContainer>
                      <RNPickerSelect
                        onValueChange={itemValue =>
                          setDonationAmount(itemValue)
                        }
                        placeholder={{
                          label: 'Click to select an amount',
                          value: null,
                          fontWeight: 'bold',
                          textAlign: 'center',
                        }}
                        items={[
                          {
                            label: '£1',
                            value: '1',
                          },
                          {
                            label: '£2',
                            value: '2',
                          },
                          {
                            label: '£5',
                            value: '5',
                          },
                          {
                            label: '£10',
                            value: '10',
                          },
                          {
                            label: '£20',
                            value: '20',
                          },
                        ]}
                        style={{
                          placeholder: {
                            color: 'white',
                            fontWeight: 'bold',
                            fontSize: isIpad ? 18 : 14,
                            textAlign: 'center',
                          },
                          inputIOS: { color: theme.colors.white },
                          inputAndroid: { color: theme.colors.white },
                        }}
                      />
                      <Spacer size={theme.space.lg} />
                      <SectionDescription>or enter custom</SectionDescription>
                      <Spacer size={theme.space.md} />
                      <TextInput
                        placeholder="Enter custom amount"
                        keyboardType="numeric"
                        value={donationAmount}
                        onChangeText={text => setDonationAmount(text)}
                      />
                    </FormContainer>
                    {donationAmount && (
                      <>
                        <Spacer size={theme.space.lg} />
                        <ShareableButton
                          text={`Click to Donate to £${donationAmount} ${homelessPersonFirstName}`}
                          handler={handleDonation}
                        />
                        <Spacer size={theme.space.md} />
                        <ShareableButton text="Cancel" handler={handleCancel} />
                      </>
                    )}
                  </>
                )}
              </>
            ) : (
              <QRCodeScanner
                onRead={handleQRCodeRead}
                flashMode={RNCamera.Constants.FlashMode.auto}
                topViewStyle={{
                  flex: 1,
                  alignSelf: 'center',
                }}
                topContent={
                  <TopContentContainer>
                    <SectionTitle>Scan QR code</SectionTitle>
                  </TopContentContainer>
                }
                cameraStyle={{
                  width: '80%',
                  height: '80%',
                  alignSelf: 'center',
                  justifyContent: 'center',
                  marginTop: 20,
                }}
              />
            )}
          </QRCodeScannerContainer>
          {/* <Button title="Simulate QR Scan" onPress={simulateQRScan} /> */}
        </InnerContainer>
      </SafeAreaViewStatus>
      <Modal visible={showSuccessModal} animationType="slide">
        <SafeAreaViewStatus>
          <InnerContainer>
            <SectionTitle>Donation was successful!</SectionTitle>
            <Spacer size={theme.space.md} />
            <ShareableButton
              text="Close"
              handler={() => {
                setShowSuccessModal(false);
                setDonationSubmitted(false);
                setHomelessPersonFirstName('');
                setDonationAmount('');
              }}
            />
          </InnerContainer>
        </SafeAreaViewStatus>
      </Modal>
    </>
  );
};
