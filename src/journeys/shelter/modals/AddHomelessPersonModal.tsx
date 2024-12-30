import React, { useState } from 'react';
import { Modal, ScrollView, Text } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

import { firebaseAddHomelessPerson } from '@src/api/homeless-persons';
import { InnerContainer } from '@src/components/layout/InnerContainer';
import { SafeAreaViewStatus } from '@src/components/layout/SafeAreaViewStatus';
import { ShareableButton } from '@src/components/organisms/shareable-button/ShareableButton';
import InputTextLabel from '@src/components/utility/input-text-label/InputTextLabel';
import ScreenHeader from '@src/components/utility/screen-header/ScreenHeader';
import TextInput from '@src/components/utility/text-input/TextInput';
import { theme } from '@src/theme';
import { Spacer } from '@src/components/layout/Spacer';

const AddUserModal = ({
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
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!firstName) newErrors.firstName = 'First name is required';
    if (!surname) newErrors.surname = 'Surname is required';
    if (!gender) newErrors.gender = 'Please select a gender';
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
      })
        .then(() => {
          clearStateAndCloseModal();
        })
        .catch(error => {
          console.error('Error adding homeless person:', error);
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
              ]}
              style={{
                inputIOS: { color: theme.colors.white },
                inputAndroid: { color: theme.colors.white },
              }}
            />
            {errors.gender && <Text style={errorText}>{errors.gender}</Text>}
            <InputTextLabel text="Email:" />
            <TextInput
              placeholder="Email"
              value={email}
              onChangeText={text => setEmail(text)}
            />
            <Spacer size={theme.space.lg} />
            <ShareableButton
              handler={() => handleAddHomlessPerson()}
              text="Add User"
            />
          </ScrollView>
        </InnerContainer>
      </SafeAreaViewStatus>
    </Modal>
  );
};

export default AddUserModal;
