import React, { useEffect, useState } from 'react';
import { NavigationProp } from '@react-navigation/native';

import {
  firebaseDeleteHomelessPerson,
  firebaseGetHomelessPersonById,
  firebaseUpdateHomelessPersonQrCodeExpiry,
} from '@src/api/homeless-persons';
import { InnerContainer } from '@src/components/layout/InnerContainer';
import { SafeAreaViewStatus } from '@src/components/layout/SafeAreaViewStatus';
import ScreenHeader from '@src/components/utility/screen-header/ScreenHeader';
import { RootStackParamList } from '@src/types/navigation-types';
import { getRandomUserProfileImage } from '@src/api/get-people-donations';
import { HomelessPersonProfileImage } from '../styles/homeless-person-profile-modal.styles';
import { ProfileContainer } from '@src/journeys/shared/styles/profile-screen.styles';
import SectionDescription from '@src/components/molecules/section-description/SectionDescription';
import { ShareableButton } from '@src/components/organisms/shareable-button/ShareableButton';
import { Spacer } from '@src/components/layout/Spacer';
import { theme } from '@src/theme';
import { View } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { formatDaysRemaining } from '@src/utils/formatDaysRemaining';

export type HomelessPersonProfileModalProps = {
  route: { params: { id: string } };
  navigation: NavigationProp<RootStackParamList>;
};

export const HomelessPersonProfileModal = ({
  navigation,
  route,
}: HomelessPersonProfileModalProps) => {
  const { id: homelessPersonId } = route.params;
  const [firstName, setFirstName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState<null | string>(null);
  const [phoneNumber, setPhoneNumber] = useState<null | string>(null);
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [gender, setGender] = useState('');
  const [imageSource, setImageSource] = useState('');
  const [lastQrCodeExpiryDate, setLastQrCodeExpiryDate] = useState(0);
  const [qrCodeValue, setQrCodeValue] = useState('');
  const [showGeneratedQrCodeMessage, setShowGeneratedQrCodeMessage] =
    useState(false);

  useEffect(() => {
    // get homeless person details from firebase with if
    firebaseGetHomelessPersonById(homelessPersonId).then(person => {
      setFirstName(person.firstName);
      setSurname(person.surname);
      setEmail(person.email);
      setPhoneNumber(person.phoneNumber);
      setLastQrCodeExpiryDate(person.lastQrCodeExpiryDate);
      setDateOfBirth(person.dateOfBirth);
      setGender(person.gender);
    });
  }, []);

  // TODO get real data from firebase storage when setup
  useEffect(() => {
    getRandomUserProfileImage().then(response => {
      setImageSource(response);
    });
  }, []);

  const isQRCodeExpired = (): boolean => {
    return Date.now() > lastQrCodeExpiryDate;
  };

  useEffect(() => {
    // Set initial QR code value when component mounts or lastQrCodeExpiryDate changes
    setQrCodeValue(`${homelessPersonId}_${lastQrCodeExpiryDate}`);
  }, [lastQrCodeExpiryDate]);

  const handleUpdateQRCode = async () => {
    const newExpiryDate = Date.now() + 7 * 24 * 60 * 60 * 1000;
    await firebaseUpdateHomelessPersonQrCodeExpiry({
      lastQrCodeExpiryDate: newExpiryDate,
      id: homelessPersonId,
    });
    setLastQrCodeExpiryDate(newExpiryDate);
    setQrCodeValue(`${homelessPersonId}_${newExpiryDate}`);
    setShowGeneratedQrCodeMessage(true);
  };

  return (
    <SafeAreaViewStatus>
      <ScreenHeader isModal={true} handleClose={() => navigation.goBack()} />
      <InnerContainer>
        <ProfileContainer>
          {imageSource && (
            <HomelessPersonProfileImage source={{ uri: imageSource }} />
          )}
          <Spacer size={theme.space.lg} />
          <SectionDescription>{`Name: ${firstName} ${surname}`}</SectionDescription>
          <Spacer size={theme.space.sm} />

          {email && (
            <>
              <SectionDescription>{`Email: ${email}`}</SectionDescription>
              <Spacer size={theme.space.sm} />
            </>
          )}
          <SectionDescription>{`DOB: ${dateOfBirth}`}</SectionDescription>
          <Spacer size={theme.space.sm} />
          <SectionDescription>{`Gender: ${gender}`}</SectionDescription>
          <Spacer size={theme.space.sm} />
          {phoneNumber && (
            <>
              <SectionDescription>{`Number: ${phoneNumber}`}</SectionDescription>
              <Spacer size={theme.space.sm} />
            </>
          )}
          {qrCodeValue && (
            <View style={{ alignItems: 'center' }}>
              <QRCode value={qrCodeValue} size={200} />
            </View>
          )}
          <Spacer size={theme.space.lg} />
          {isQRCodeExpired() ? (
            <SectionDescription>
              The current QR code has expired. Please regenerate a new one.
            </SectionDescription>
          ) : (
            <SectionDescription>
              {` The current QR code ${formatDaysRemaining(
                lastQrCodeExpiryDate,
              )}`}
            </SectionDescription>
          )}
          <Spacer size={theme.space.lg} />
          <ShareableButton
            handler={() => handleUpdateQRCode()}
            text="Regenerate QR Code"
          />
          <Spacer size={theme.space.lg} />
          {showGeneratedQrCodeMessage && (
            <SectionDescription>
              The QR Code was updated successfully
            </SectionDescription>
          )}
          <Spacer size={theme.space.lg} />
          <ShareableButton
            handler={() =>
              firebaseDeleteHomelessPerson(homelessPersonId)
                .then(() => navigation.goBack())
                .catch(error => {
                  console.error('Error deleting homeless person:', error);
                })
            }
            text="Delete User"
          />
        </ProfileContainer>
      </InnerContainer>
    </SafeAreaViewStatus>
  );
};

//TODO the logic around timecode expiry is not clear. It seems like the qr code is generated and then the expiry date is set to 7 days from now. This means that the qr code will be valid for 7 days from the time it was generated. This is not the same as the qr code being valid for 7 days from the time it was scanned. This is a potential security risk as the qr code could be scanned after the expiry date and still be valid. This should be reviewed and updated to ensure that the qr code is only valid for 7 days from the time it was scanned.
//TODO the qr code value is generated using the homeless person id and the current timestamp. This is a potential security risk as the qr code value is predictable and could be easily guessed. This should be reviewed and updated to ensure that the qr code value is random and not easily guessable.
