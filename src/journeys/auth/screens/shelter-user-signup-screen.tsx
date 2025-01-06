import React, { useState } from 'react';
import { Alert, Text } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
// import CheckBox from '@react-native-community/checkbox';
import { StackNavigationProp } from '@react-navigation/stack';

import { firebaseSignUpHomelessShelterUser } from '@src/api/auth-services';
import { InnerContainer } from '@src/components/layout/InnerContainer';
import { SafeAreaViewStatus } from '@src/components/layout/SafeAreaViewStatus';
import { Spacer } from '@src/components/layout/Spacer';
import { ShareableButton } from '@src/components/organisms/shareable-button/ShareableButton';
import InputTextLabel from '@src/components/utility/input-text-label/InputTextLabel';
import TextInput from '@src/components/utility/text-input/TextInput';
import screenNames from '@src/constants/screen-names';
import { useAppDispatch } from '@src/hooks/redux/reduxHooks';
import { signUpHomelessShelterUser } from '@src/store/redux/slices/userSlice';
import { AppDispatch } from '@src/store/store';
import { theme } from '@src/theme';
import { UserOptionType } from '@src/types/auth-services-types';
import { RootStackParamList } from '@src/types/navigation-types';

type HomelessShelterSignupScreenNavigationProp =
  StackNavigationProp<RootStackParamList>;

export const HomelessShelterSignupScreen = ({
  navigation,
}: {
  navigation: HomelessShelterSignupScreenNavigationProp;
}) => {
  const dispatch: AppDispatch = useAppDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [secondPassword, setSecondPassword] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  // const isButtonDisabled =
  //   password === secondPassword &&
  //   password.length > 0 &&
  //   secondPassword.length > 0 &&
  //   email.length > 0;

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!businessName) newErrors.firstName = 'Business name is required';
    if (!phoneNumber) newErrors.phoneNumber = 'Phone number is required';
    if (!email) newErrors.email = 'Email is required';
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
          <InputTextLabel text="Business Name:" />
          <TextInput
            placeholder="Business Name"
            value={businessName}
            onChangeText={text => setBusinessName(text)}
            autoFocus={true}
          />
          {errors.businessName && (
            <Text style={errorText}>{errors.firstName}</Text>
          )}
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
          <InputTextLabel text="Address:" />
          <TextInput
            placeholder="Address"
            value={address}
            onChangeText={text => setAddress(text)}
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
          {/* //TODO - Keeping checkbox feature example for future use */}
          {/* <InputTextLabel text="Are you a shelter or Hostel?" />
          <CheckBox
            value={isShelterUserSelected}
            onValueChange={setIsShelterUserSelected}
            style={{ backgroundColor: 'white' }}
            boxType="square"
          /> */}
          <ShareableButton
            color="white"
            text="Sign Up"
            // disabled={!isButtonDisabled}
            handler={() => {
              if (validate()) {
                firebaseSignUpHomelessShelterUser({
                  businessName,
                  email,
                  password,
                  address: '', //TODO - Add address field
                  userType: UserOptionType.SHELTER_USER,
                  phoneNumber,
                })
                  .then(() => {
                    dispatch(
                      signUpHomelessShelterUser({
                        email,
                        businessName,
                        address,
                        phoneNumber,
                        userType: UserOptionType.SHELTER_USER,
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
          <Spacer size={theme.space.lg} />
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
