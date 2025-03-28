import React, { useState } from 'react';
import { Alert, Text } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { StackNavigationProp } from '@react-navigation/stack';

import { firebaseSignUp } from '@src/api/auth-services';
import { InnerContainer } from '@src/components/layout/InnerContainer';
import { SafeAreaViewStatus } from '@src/components/layout/SafeAreaViewStatus';
import { Spacer } from '@src/components/layout/Spacer';
import { ShareableButton } from '@src/components/organisms/shareable-button/ShareableButton';
import InputTextLabel from '@src/components/utility/input-text-label/InputTextLabel';
import TextInput from '@src/components/utility/text-input/TextInput';
import screenNames from '@src/constants/screen-names';
import { useAppDispatch } from '@src/hooks/redux/reduxHooks';
import { signUpUser } from '@src/store/redux/slices/userSlice';
import { AppDispatch } from '@src/store/store';
import { theme } from '@src/theme';
import { UserOptionType } from '@src/types/auth-services-types';
import { RootStackParamList } from '@src/types/navigation-types';

type SignupScreenNavigationProp = StackNavigationProp<RootStackParamList>;

export const SignupScreen = ({
  navigation,
}: {
  navigation: SignupScreenNavigationProp;
}) => {
  const dispatch: AppDispatch = useAppDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [secondPassword, setSecondPassword] = useState('');
  const [firstName, setFirstname] = useState('');
  const [surname, setSurname] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  // const isButtonDisabled =
  //   password === secondPassword &&
  //   password.length > 0 &&
  //   secondPassword.length > 0 &&
  //   email.length > 0;

  const phoneRegex = /^[0-9]{9,12}$/;
  const emailRegex = /^[^@]+@[^@]+$/;

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!firstName) newErrors.firstName = 'First name is required';
    if (!surname) newErrors.surname = 'Surname is required';
    if (!phoneNumber) newErrors.phoneNumber = 'Phone number is required';
    if (!phoneRegex.test(phoneNumber)) {
      newErrors.phoneNumber = 'Invalid phone number';
    }
    if (!email) newErrors.email = 'Email is required';
    if (!emailRegex.test(email)) newErrors.email = 'Invalid email address';
    if (!password) newErrors.password = 'Password is required';
    if (password.length < 6)
      newErrors.password = 'Password must be at least 6 characters';
    if (password !== secondPassword)
      newErrors.secondPassword = 'Passwords do not match';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const errorText = theme.fontStyles.errorText;
  return (
    <SafeAreaViewStatus>
      <ScrollView>
        <InnerContainer>
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
          {errors.phoneNumber && (
            <Text style={errorText}>{errors.phoneNumber}</Text>
          )}
          <InputTextLabel text="Email:" />
          <TextInput
            placeholder="Email"
            value={email}
            onChangeText={text => setEmail(text)}
          />
          {errors.email && <Text style={errorText}>{errors.email}</Text>}
          <InputTextLabel text="Password:" />
          <TextInput //TODO - Add rules for password
            placeholder="Password"
            secureTextEntry
            value={password}
            onChangeText={text => setPassword(text)}
          />
          {errors.password && <Text style={errorText}>{errors.password}</Text>}
          <InputTextLabel text="Password Again:" />
          <TextInput
            placeholder="Password Again"
            secureTextEntry
            onChangeText={text => setSecondPassword(text)}
          />
          {errors.secondPassword && (
            <Text style={errorText}>{errors.secondPassword}</Text>
          )}
          <Spacer size={theme.space.lg} />
          <ShareableButton
            color="white"
            text="Sign Up"
            // disabled={!isButtonDisabled}
            handler={() => {
              if (validate()) {
                firebaseSignUp({
                  email,
                  password,
                  userType: UserOptionType.STANDARD_USER,
                  firstName,
                  surname,
                  phoneNumber,
                })
                  .then(() => {
                    dispatch(
                      signUpUser({
                        email,
                        firstName,
                        surname,
                        phoneNumber,
                        userType: UserOptionType.STANDARD_USER,
                      }),
                    );
                  })
                  .then(() => {
                    navigation.navigate(screenNames.ACCOUNT_DRAWER_NAVIGATOR);
                  })
                  .catch(error => {
                    Alert.alert('Error', error.message); //TODO - replace with error component
                  });
              }
            }}
          />
          <Spacer size={theme.space.md} />
          <ShareableButton
            color="white"
            text="Back to Login"
            handler={() => {
              navigation.goBack();
            }}
          />
        </InnerContainer>
      </ScrollView>
    </SafeAreaViewStatus>
  );
};
