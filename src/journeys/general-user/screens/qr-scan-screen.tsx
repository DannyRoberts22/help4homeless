import {InnerContainer} from '@src/components/layout/InnerContainer';
import {SafeAreaViewStatus} from '@src/components/layout/SafeAreaViewStatus';
import React, {useState} from 'react';
import {Text} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {BarCodeReadEvent, RNCamera} from 'react-native-camera';

import {qrScanScreenStyles} from '../styles/qr-scan-screen.styles';

export const QRScanScreen = () => {
  const [scannedData, setScannedData] = useState('');

  const onSuccess = (e: BarCodeReadEvent) => {
    setScannedData(e.data);
  };
  return (
    <SafeAreaViewStatus>
      <InnerContainer>
        <QRCodeScanner
          onRead={onSuccess}
          flashMode={RNCamera.Constants.FlashMode.auto}
          topContent={
            <Text style={qrScanScreenStyles.centerText}>Scan the QR code.</Text>
          }
          bottomContent={
            <Text style={qrScanScreenStyles.centerText}>
              Scanned data: {scannedData}
            </Text>
          }
        />
      </InnerContainer>
    </SafeAreaViewStatus>
  );
};
