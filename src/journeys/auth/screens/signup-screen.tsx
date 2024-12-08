import React, {useState} from 'react';
import {SafeAreaViewStatus} from '@src/components/layout/SafeAreaViewStatus';
import {Alert, Text} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import TextInput from '@src/components/utility/text-input/TextInput';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '@src/types/navigation-types';
import screenNames from '@src/constants/screen-names';
import {InnerContainer} from '@src/components/layout/InnerContainer';
import InputTextLabel from '@src/components/utility/input-text-label/InputTextLabel';
import {theme} from '@src/theme';
import {Spacer} from '@src/components/layout/Spacer';
import {firebaseSignUp} from '@src/api/auth-services';
import {signUpUser} from '@src/store/redux/slices/userSlice';
import {AppDispatch} from '@src/store/store';
import {useAppDispatch} from '@src/hooks/redux/reduxHooks';
import {ShareableButton} from '@src/components/organisms/shareable-button/ShareableButton';
import {UserOptionType} from '@src/types/auth-services-types';
import {ScrollView} from 'react-native-gesture-handler';

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
  const [isShelterUserSelected, setIsShelterUserSelected] = useState(false);
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  // const isButtonDisabled =
  //   password === secondPassword &&
  //   password.length > 0 &&
  //   secondPassword.length > 0 &&
  //   email.length > 0;

  const validate = () => {
    const newErrors: {[key: string]: string} = {};
    if (!firstName) newErrors.firstName = 'First name is required';
    if (!surname) newErrors.surname = 'Surname is required';
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
          <InputTextLabel text="Are you a shelter or Hostel?" />
          <CheckBox
            value={isShelterUserSelected}
            onValueChange={setIsShelterUserSelected}
            style={{backgroundColor: 'white'}}
            boxType="square"
          />
          <ShareableButton
            color="white"
            text="Sign Up"
            // disabled={!isButtonDisabled}
            handler={() => {
              if (validate()) {
                firebaseSignUp({
                  email,
                  password,
                  userType: isShelterUserSelected
                    ? UserOptionType.SHELTER_USER
                    : UserOptionType.NORMAL_USER,
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
                        userType: isShelterUserSelected
                          ? UserOptionType.SHELTER_USER
                          : UserOptionType.NORMAL_USER,
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
