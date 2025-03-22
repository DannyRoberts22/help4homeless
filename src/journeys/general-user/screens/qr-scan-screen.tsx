import React, { useCallback, useState } from 'react';
import { Alert, Button, TouchableOpacity } from 'react-native';
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

export const QRScanScreen = () => {
  const [homelessPersonId, setHomelessPersonId] = useState('');
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
    setHomelessPersonId(homelessPersonId);
    const expiryDate = data.split('_')[1];
    const isExpired = Date.now() > Number(expiryDate);
    console.log(data);
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
    handleQRCodeRead({ data: 'Wbq34DqVYSPeV1y2DKcz_1743270904314' });
  };

  const handleDonation = () => {
    firebaseUpdateHomelessPersonBalance({
      amount: Number(donationAmount) * 100,
      id: homelessPersonId,
      operation: 'donation',
    })
      .then(() => {
        firebasePushPeopleDonation({
          amount: Number(donationAmount) * 100,
          name: homelessPersonFirstName,
        });
      })
      .then(() => {
        Alert.alert('Donation successful', 'Thank you for your donation');
        setDonationAmount('');
        setDonationSubmitted(true);
        setHomelessPersonFirstName('');
      });
  };

  console.log('donationAmount:', donationAmount);
  return (
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
                  <SectionDescription>
                    {`How much would you like to donate to ${homelessPersonFirstName}?`}
                  </SectionDescription>
                  <Spacer size={theme.space.xxl} />
                  <FormContainer>
                    <RNPickerSelect
                      onValueChange={itemValue => setDonationAmount(itemValue)}
                      placeholder={{
                        label: 'Click to select an amount',
                        value: null,
                        color: 'white',
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
                        placeholder: { color: 'white', fontWeight: '500' },
                        inputIOS: { color: theme.colors.white },
                        inputAndroid: { color: theme.colors.white },
                      }}
                    />
                    <Spacer size={theme.space.xxl} />
                    <SectionDescription>
                      or enter custom amount
                    </SectionDescription>
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
                      <Spacer size={theme.space.sm} />
                      <ShareableButton
                        handler={handleDonation}
                        text={` Click to Donate to £${donationAmount} ${homelessPersonFirstName}`}
                      />
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
                alignSelf: 'center',
              }}
              bottomContent={
                <SectionDescription>
                  {homelessPersonFirstName}
                </SectionDescription>
              }
            />
          )}
        </QRCodeScannerContainer>
        <Button title="Simulate QR Scan" onPress={simulateQRScan} />
      </InnerContainer>
    </SafeAreaViewStatus>
  );
};
