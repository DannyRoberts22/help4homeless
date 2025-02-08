import React, { useState } from 'react';
import { Alert, Modal, ScrollView, Text } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import DatePicker from 'react-native-date-picker';

import { firebaseAddHomelessPerson } from '@src/api/homeless-persons';
import { InnerContainer } from '@src/components/layout/InnerContainer';
import { SafeAreaViewStatus } from '@src/components/layout/SafeAreaViewStatus';
import { ShareableButton } from '@src/components/organisms/shareable-button/ShareableButton';
import InputTextLabel from '@src/components/utility/input-text-label/InputTextLabel';
import ScreenHeader from '@src/components/utility/screen-header/ScreenHeader';
import TextInput from '@src/components/utility/text-input/TextInput';
import { theme } from '@src/theme';
import { Spacer } from '@src/components/layout/Spacer';

export const formatDate = (date: Date): string => {
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();

  return `${day}-${month}-${year}`;
};

const AddHomelessPersonModal = ({
  modalVisible,
  closeModal,
}: {
  modalVisible: boolean;
  closeModal: () => void;
}) => {
  const [firstName, setFirstname] = useState('');
  const [surname, setSurname] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState(null);
  const [dateOfBirth, setDateOfBirth] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const lastQrCodeExpiryDate = Date.now() + 7 * 24 * 60 * 60 * 1000;
  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!firstName) newErrors.firstName = 'First name is required';
    if (!surname) newErrors.surname = 'Surname is required';
    if (!gender) newErrors.gender = 'Please select a gender';
    if (!dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const errorText = theme.fontStyles.errorText;

  const clearStateAndCloseModal = () => {
    setFirstname('');
    setSurname('');
    setPhoneNumber('');
    setEmail('');
    setGender(null);
    setDateOfBirth(new Date());
    setShowDatePicker(false);
    setErrors({});
    closeModal();
  };

  const handleAddHomlessPerson = () => {
    if (validate()) {
      firebaseAddHomelessPerson({
        firstName,
        surname,
        phoneNumber,
        gender,
        email,
        dateOfBirth: formatDate(dateOfBirth),
        lastQrCodeExpiryDate,
      })
        .then(() => {
          clearStateAndCloseModal();
        })
        .then(() => {
          Alert.alert('Homeless person added successfully');
        })
        .catch(() => {
          Alert.alert('Error adding user - please try again');
        });
    }
  };

  return (
    <Modal
      animationType="slide" // or "fade" for fade-in and fade-out animation
      transparent={true}
      visible={modalVisible}
      onRequestClose={clearStateAndCloseModal} // Android back button handling
    >
      <SafeAreaViewStatus>
        <ScreenHeader isModal={true} handleClose={clearStateAndCloseModal} />
        <InnerContainer>
          <ScrollView>
            <InputTextLabel text="First Name:" />
            <TextInput
              placeholder="First Name"
              value={firstName}
              onChangeText={text => setFirstname(text)}
              autoFocus={true}
            />
            {errors.firstName && (
              <Text style={errorText}>{errors.firstName}</Text>
            )}
            <InputTextLabel text="Surname:" />
            <TextInput
              placeholder="Surname"
              value={surname}
              onChangeText={text => setSurname(text)}
            />
            {errors.surname && <Text style={errorText}>{errors.surname}</Text>}
            <InputTextLabel text="Phone Number:" />
            <TextInput
              placeholder="Phone number"
              keyboardType="numeric"
              value={phoneNumber}
              onChangeText={text => setPhoneNumber(text)}
            />
            <InputTextLabel text="Gender:" />
            <RNPickerSelect
              onValueChange={itemValue => setGender(itemValue)}
              items={[
                {
                  label: 'Male',
                  value: 'male',
                },
                {
                  label: 'Female',
                  value: 'female',
                },
                {
                  label: 'Unspecified',
                  value: 'unspecified',
                },
              ]}
              style={{
                inputIOS: { color: theme.colors.white },
                inputAndroid: { color: theme.colors.white },
              }}
            />
            {errors.gender && <Text style={errorText}>{errors.gender}</Text>}
            <InputTextLabel text="Date of Birth:" />
            <ShareableButton
              handler={() => setShowDatePicker(true)}
              text={
                dateOfBirth ? dateOfBirth.toLocaleDateString() : 'Select Date'
              }
            />
            {errors.dateOfBirth && (
              <Text style={errorText}>{errors.dateOfBirth}</Text>
            )}
            <DatePicker
              locale="en"
              modal
              open={showDatePicker}
              date={dateOfBirth}
              mode="date"
              maximumDate={new Date()}
              onConfirm={date => {
                setShowDatePicker(false);
                setDateOfBirth(date);
              }}
              onCancel={() => {
                setShowDatePicker(false);
              }}
            />
            <InputTextLabel text="Email:" />
            <TextInput
              placeholder="Email"
              value={email}
              onChangeText={text => setEmail(text)}
            />
            <Spacer size={theme.space.lg} />
            <ShareableButton
              handler={() => handleAddHomlessPerson()}
              text="Submit"
            />
          </ScrollView>
        </InnerContainer>
      </SafeAreaViewStatus>
    </Modal>
  );
};

export default AddHomelessPersonModal;
