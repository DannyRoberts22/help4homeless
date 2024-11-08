import {InnerContainer} from '@src/components/layout/InnerContainer';
import {SafeAreaViewStatus} from '@src/components/layout/SafeAreaViewStatus';
import React, {useState} from 'react';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {BarCodeReadEvent, RNCamera} from 'react-native-camera';

import {
  CenterText,
  QRCodeScannerContainer,
} from '../styles/qr-scan-screen.styles';

export const QRScanScreen = () => {
  const [scannedData, setScannedData] = useState('');

  const onSuccess = (e: BarCodeReadEvent) => {
    setScannedData(e.data);
  };
  return (
    <SafeAreaViewStatus>
      {/* <InnerContainer> */}
      <QRCodeScannerContainer>
        <QRCodeScanner
          onRead={onSuccess}
          flashMode={RNCamera.Constants.FlashMode.auto}
          topContent={<CenterText>Scan the QR code.</CenterText>}
          cameraStyle={{
            width: '80%',
            alignSelf: 'center',
          }}
          bottomContent={
            scannedData ? (
              <CenterText>Scanned data: {scannedData}</CenterText>
            ) : (
              ''
            )
          }
        />
      </QRCodeScannerContainer>
      {/* </InnerContainer> */}
    </SafeAreaViewStatus>
  );
};
