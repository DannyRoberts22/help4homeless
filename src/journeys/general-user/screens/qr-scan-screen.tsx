import React, { useCallback, useState } from 'react';
import { Alert, Button, TouchableOpacity } from 'react-native';
import { RNCamera } from 'react-native-camera';
import QRCodeScanner from 'react-native-qrcode-scanner';

import RNPickerSelect from 'react-native-picker-select';
import { SafeAreaViewStatus } from '@src/components/layout/SafeAreaViewStatus';
import SectionDescription from '@src/components/molecules/section-description/SectionDescription';
import { firebaseGetHomelessPersonById } from '@src/api/homeless-persons';
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

export const QRScanScreen = () => {
  const [homelessPersonFirstName, setHomelessPersonFirstName] = useState('');
  const [isQrCodeExpired, setisQrCodeExpired] = useState(false);
  const [donationAmount, setDonationAmount] = useState('');
  const [donationSubmitted, setDonationSubmitted] = useState(false);

  useFocusEffect(
    useCallback(() => {
      setHomelessPersonFirstName('');
      setisQrCodeExpired(false);
      setDonationAmount('');
      setDonationSubmitted(false);
    }, []),
  );

  const handleQRCodeRead = ({ data }: { data: string }) => {
    const homelessPersonId = data.split('_')[0];
    const expiryDate = data.split('_')[1];
    const isExpired = Date.now() > Number(expiryDate);

    if (isExpired) {
      console.log('QR code is expired');
      setisQrCodeExpired(true);
      return;
    }

    if (homelessPersonId && !isExpired) {
      setisQrCodeExpired(false);
      firebaseGetHomelessPersonById(homelessPersonId).then(person => {
        setHomelessPersonFirstName(person.firstName);
      });
    }
  };

  const simulateQRScan = () => {
    handleQRCodeRead({ data: 'oZqM4a3xnPw5H60yHxyf_1739613626741' });
  };

  const handleDonation = () => {
    console.log('Donating to:', homelessPersonFirstName);
    setDonationAmount('');
    setDonationSubmitted(true);
    setHomelessPersonFirstName('');
    Alert.alert('Donation successful', 'Thank you for your donation');
  };

  console.log('donationAmount:', donationAmount);
  return (
    <SafeAreaViewStatus>
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
                <SectionDescription>
                  {`How much would you like to donate to ${homelessPersonFirstName}?`}
                </SectionDescription>
                <FormContainer>
                  <RNPickerSelect
                    onValueChange={itemValue => setDonationAmount(itemValue)}
                    placeholder={{
                      label: 'Select an amount',
                      value: null,
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
                      inputIOS: { color: theme.colors.white },
                      inputAndroid: { color: theme.colors.white },
                    }}
                  />
                  <Spacer size={theme.space.lg} />
                  <SectionDescription>
                    or enter custom amount
                  </SectionDescription>
                  <Spacer size={theme.space.sm} />
                  <TextInput
                    placeholder="Enter custom amount"
                    keyboardType="numeric"
                    value={donationAmount}
                    onChangeText={text => setDonationAmount(text)}
                  />
                </FormContainer>
                <Spacer size={theme.space.sm} />
                <TouchableOpacity onPress={handleDonation}>
                  <SectionTitle>
                    {` Click to Donate to ${homelessPersonFirstName}`}
                  </SectionTitle>
                </TouchableOpacity>
              </>
            )}
            {/* <SectionDescription>🎉</SectionDescription> */}
          </>
        ) : (
          <QRCodeScanner
            onRead={handleQRCodeRead}
            flashMode={RNCamera.Constants.FlashMode.auto}
            topContent={
              <TopContentContainer>
                <SectionDescription>Scan the QR code</SectionDescription>
              </TopContentContainer>
            }
            cameraStyle={{
              width: '80%',
              alignSelf: 'center',
            }}
            bottomContent={
              <SectionDescription>{homelessPersonFirstName}</SectionDescription>
            }
          />
        )}
      </QRCodeScannerContainer>
      <Button title="Simulate QR Scan" onPress={simulateQRScan} />
    </SafeAreaViewStatus>
  );
};
