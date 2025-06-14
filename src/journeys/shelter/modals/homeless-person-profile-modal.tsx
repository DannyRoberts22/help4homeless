import React, { useEffect, useState } from 'react';
import { NavigationProp } from '@react-navigation/native';

import {
  firebaseDeleteHomelessPerson,
  firebaseGetHomelessPersonById,
  firebaseUpdateHomelessPersonBalance,
  firebaseUpdateHomelessPersonEmail,
  firebaseUpdateHomelessPersonPhoneNumber,
  firebaseUpdateHomelessPersonQrCodeExpiry,
} from '@src/api/homeless-persons';
import { InnerContainer } from '@src/components/layout/InnerContainer';
import { SafeAreaViewStatus } from '@src/components/layout/SafeAreaViewStatus';
import ScreenHeader from '@src/components/utility/screen-header/ScreenHeader';
import { RootStackParamList } from '@src/types/navigation-types';
import { HomelessPersonProfileImage } from '../styles/homeless-person-profile-modal.styles';
import { ProfileContainer } from '@src/journeys/shared/styles/profile-screen.styles';
import SectionDescription from '@src/components/molecules/section-description/SectionDescription';
import { ShareableButton } from '@src/components/organisms/shareable-button/ShareableButton';
import { Spacer } from '@src/components/layout/Spacer';
import { theme } from '@src/theme';
import { Alert, Button, Modal, ScrollView, View } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { formatDaysRemaining } from '@src/utils/formatDaysRemaining';
import TextInput from '@src/components/utility/text-input/TextInput';
import { getRandomHomelessPersonImage } from '@src/utils/getRandomHomelessPersonImage';
import { HomelessPerson } from '@src/api/types';

export type HomelessPersonProfileModalProps = {
  route: { params: { id: string } };
  navigation: NavigationProp<RootStackParamList>;
};

const getHomelessPersonDetails = async (
  homelessPersonId: string,
): Promise<HomelessPerson> => {
  return await firebaseGetHomelessPersonById(homelessPersonId);
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
  const [reimburseAmount, setReimburseAmount] = useState('');
  const [refresh, setRefresh] = useState(false);
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newPhoneNumber, setNewPhoneNumber] = useState('');
  // const [gender, setGender] = useState('');
  // const [imageSource, setImageSource] = useState('');
  const [shouldUpdateEmail, setShouldUpdateEmail] = useState(false);
  const [shouldUpdatePhoneNumber, setShouldUpdatePhoneNumber] = useState(false);
  const [lastQrCodeExpiryDate, setLastQrCodeExpiryDate] = useState(0);
  const [qrCodeValue, setQrCodeValue] = useState('');
  console.log('🚀 ~ qrCodeValue:', qrCodeValue);
  const [showGeneratedQrCodeMessage, setShowGeneratedQrCodeMessage] =
    useState(false);

  useEffect(() => {
    getHomelessPersonDetails(homelessPersonId).then(person => {
      setFirstName(person?.firstName);
      setSurname(person?.surname);
      setEmail(person?.email);
      setPhoneNumber(person?.phoneNumber);
      setBalance(person?.balance ?? 0);
      setLastQrCodeExpiryDate(person?.lastQrCodeExpiryDate);
      setDateOfBirth(person?.dateOfBirth);
      // setGender(person.gender);
    });
  }, [shouldUpdateEmail]);

  const isQRCodeExpired = (): boolean => {
    return Date.now() > lastQrCodeExpiryDate;
  };

  useEffect(() => {
    // Set initial QR code value when component mounts or lastQrCodeExpiryDate changes
    setQrCodeValue(
      `helpapp://app/qrscan?homelessPersonId=${homelessPersonId}_${lastQrCodeExpiryDate}`,
    );
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
    const amount = Number(reimburseAmount) * 100;
    firebaseUpdateHomelessPersonBalance({
      amount,
      operation: 'cost',
      id: homelessPersonId,
    })
      .then(() => {
        setBalance(prevBalance => prevBalance - amount);
        setReimburseAmount(() => '');
        setRefresh(prev => !prev);
        console.log('After update:', reimburseAmount);
      })
      .catch(error => {
        Alert.alert('Error reimbursing balance', error.message);
      });
  };

  const handleUpdateEmail = () => {
    firebaseUpdateHomelessPersonEmail({
      id: homelessPersonId,
      newEmail,
    })
      .then(() => setNewEmail(''))
      .then(() => {
        getHomelessPersonDetails(homelessPersonId).then(({ email }) =>
          setEmail(email),
        );
      })
      .catch(() => {
        Alert.alert('Setting the new email failed, please try again');
      });
  };

  const handleUpdatePhoneNumber = () => {
    firebaseUpdateHomelessPersonPhoneNumber({
      id: homelessPersonId,
      newPhoneNumber,
    })
      .then(() => setNewPhoneNumber(''))
      .then(() => {
        getHomelessPersonDetails(homelessPersonId).then(({ phoneNumber }) =>
          setPhoneNumber(phoneNumber),
        );
      })
      .catch(() => {
        Alert.alert('Setting the new email failed, please try again');
      });
  };

  return (
    <Modal visible={true} animationType="slide">
      <SafeAreaViewStatus>
        <ScreenHeader isModal={true} handleClose={() => navigation.goBack()} />
        <InnerContainer>
          <ScrollView>
            <ProfileContainer>
              <HomelessPersonProfileImage
                source={getRandomHomelessPersonImage()}
              />
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
                  <SectionDescription>{`Phone: ${phoneNumber}`}</SectionDescription>
                  <Spacer size={theme.space.md} />
                </>
              )}
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
                <>
                  <SectionDescription>
                    The QR Code was updated successfully
                  </SectionDescription>
                  <Spacer size={theme.space.lg} />
                </>
              )}
              <TextInput
                key={refresh ? 'refresh-true' : 'refresh-false'}
                keyboardType="numeric"
                placeholder="amount"
                value={reimburseAmount}
                onChangeText={text => setReimburseAmount(text)}
              />
              <ShareableButton
                handler={() => handleReimburseBalance()}
                text="Reimburse"
              />
              <Spacer size={theme.space.lg} />
              <ShareableButton
                handler={() => setShouldUpdateEmail(true)}
                text="Update Email"
              />
              {shouldUpdateEmail && (
                <>
                  <Spacer size={theme.space.sm} />
                  <TextInput
                    key={refresh ? 'refresh-true' : 'refresh-false'}
                    placeholder="Update email"
                    value={newEmail}
                    onChangeText={text => setNewEmail(text)}
                  />
                  <Button title="submit" onPress={() => handleUpdateEmail()} />
                </>
              )}
              <Spacer size={theme.space.sm} />
              <ShareableButton
                handler={() => setShouldUpdatePhoneNumber(true)}
                text="Update Phone Number"
              />
              {shouldUpdatePhoneNumber && (
                <>
                  <Spacer size={theme.space.sm} />
                  <TextInput
                    key={refresh ? 'refresh-true' : 'refresh-false'}
                    keyboardType="numeric"
                    placeholder="Update phone number"
                    value={newPhoneNumber}
                    onChangeText={text => setNewPhoneNumber(text)}
                  />
                  <Button
                    title="submit"
                    onPress={() => handleUpdatePhoneNumber()}
                  />
                </>
              )}
              <Spacer size={theme.space.lg} />
              <ShareableButton
                handler={() => handleDeleteHomelessPerson()}
                text="Delete Person"
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
