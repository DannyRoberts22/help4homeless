import React, { useEffect, useState } from 'react';
import { NavigationProp } from '@react-navigation/native';

import {
  firebaseDeleteHomelessPerson,
  firebaseGetHomelessPersonById,
  firebaseUpdateHomelessPersonBalance,
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
import { Alert, Modal, ScrollView, View } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { formatDaysRemaining } from '@src/utils/formatDaysRemaining';
import TextInput from '@src/components/utility/text-input/TextInput';

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
  const [balance, setBalance] = useState(0);
  const [reimburseAmount, setReimburseAmount] = useState(0);
  const [dateOfBirth, setDateOfBirth] = useState('');
  // const [gender, setGender] = useState('');
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
      setBalance(person.balance);
      setLastQrCodeExpiryDate(person.lastQrCodeExpiryDate);
      setDateOfBirth(person.dateOfBirth);
      // setGender(person.gender);
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

  const handleDeleteHomelessPerson = () => {
    Alert.alert("Are you sure you want to delete this person's profile?", '', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Delete',
        onPress: () => {
          firebaseDeleteHomelessPerson(homelessPersonId)
            .then(() => navigation.goBack())
            .catch(error => {
              console.error('Error deleting homeless person:', error);
            });
        },
      },
    ]);
  };

  const calculateAge = (dobString: string) => {
    const [day, month, year] = dobString.split('-').map(Number);
    const dob = new Date(year, month - 1, day); // JS months are 0-based

    const diff = Date.now() - dob.getTime();
    const age = new Date(diff).getUTCFullYear() - 1970; // Extract years

    return age;
  };

  const handleReimburseBalance = () => {
    if (!reimburseAmount) {
      Alert.alert('Please enter an amount to reimburse');
      return;
    }

    const amount = reimburseAmount * 100;
    console.log('🚀 ~ handleReimburseBalance ~ amount:', amount);
    firebaseUpdateHomelessPersonBalance({
      cost: amount,
      id: homelessPersonId,
    })
      .then(() => {
        setBalance(balance - amount);
        setReimburseAmount(0);
      })
      .catch(error => {
        Alert.alert('Error reimbursing balance', error.message);
      });
  };
  console.log('qrCodeValue', qrCodeValue);

  return (
    <Modal visible={true} animationType="slide">
      <SafeAreaViewStatus>
        <ScreenHeader isModal={true} handleClose={() => navigation.goBack()} />
        <InnerContainer>
          <ScrollView>
            <ProfileContainer>
              {imageSource && (
                <HomelessPersonProfileImage source={{ uri: imageSource }} />
              )}
              <Spacer size={theme.space.md} />
              <SectionDescription>{`Name: ${firstName} ${surname}`}</SectionDescription>
              <Spacer size={theme.space.sm} />
              {email && (
                <>
                  <SectionDescription>{`Email: ${email}`}</SectionDescription>
                  <Spacer size={theme.space.sm} />
                </>
              )}
              <SectionDescription>{`Age: ${calculateAge(
                dateOfBirth,
              )}`}</SectionDescription>
              <Spacer size={theme.space.sm} />
              {/* <SectionDescription>{`${gender}`}</SectionDescription> */}
              {phoneNumber && (
                <>
                  <SectionDescription>{`Number: ${phoneNumber}`}</SectionDescription>
                  <Spacer size={theme.space.md} />
                </>
              )}
              {/* // start here next time */}
              <SectionDescription>{`Balance: £${(balance / 100).toFixed(
                2,
              )}`}</SectionDescription>
              <Spacer size={theme.space.md} />
              {qrCodeValue && (
                <View style={{ alignItems: 'center' }}>
                  <QRCode value={qrCodeValue} size={150} />
                </View>
              )}
              <Spacer size={theme.space.lg} />
              {isQRCodeExpired() ? (
                <SectionDescription variant="warning">
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
              <TextInput
                keyboardType="numeric"
                placeholder="amount"
                value={reimburseAmount}
                onChangeText={number => setReimburseAmount(Number(number))}
              />
              <ShareableButton
                handler={() => handleReimburseBalance()}
                text="Reimburse"
              />
              <Spacer size={theme.space.lg} />
              <ShareableButton
                handler={() => handleDeleteHomelessPerson()}
                text="Delete"
              />
            </ProfileContainer>
          </ScrollView>
        </InnerContainer>
      </SafeAreaViewStatus>
    </Modal>
  );
};

//TODO the logic around timecode expiry is not clear. It seems like the qr code is generated and then the expiry date is set to 7 days from now. This means that the qr code will be valid for 7 days from the time it was generated. This is not the same as the qr code being valid for 7 days from the time it was scanned. This is a potential security risk as the qr code could be scanned after the expiry date and still be valid. This should be reviewed and updated to ensure that the qr code is only valid for 7 days from the time it was scanned.
//TODO the qr code value is generated using the homeless person id and the current timestamp. This is a potential security risk as the qr code value is predictable and could be easily guessed. This should be reviewed and updated to ensure that the qr code value is random and not easily guessable.
