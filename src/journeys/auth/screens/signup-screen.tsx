import React, {useState} from 'react';
import {SafeAreaViewStatus} from '@src/components/layout/SafeAreaViewStatus';
import {Alert} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import TextInput from '@src/components/utility/text-input/TextInput';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '@src/types/navigation-types';
import screenNames from '@src/constants/screen-names';
import {InnerContainer} from '@src/components/layout/InnerContainer';
import InputTextLabel from '@src/components/utility/input-text-label/InputTextLabel';
import {theme} from '@src/theme';
import {Spacer} from '@src/components/layout/Spacer';
import {firebaseSignUp} from '@src/services/authServices';
import {signUpUser} from '@src/store/redux/slices/userSlice';
import {AppDispatch} from '@src/store/store';
import {useAppDispatch} from '@src/hooks/redux/reduxHooks';
import {ShareableButton} from '@src/components/organisms/shareable-button/ShareableButton';
import {UserOptionType} from '@src/services/types';

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
  const isButtonDisabled =
    password === secondPassword &&
    password.length > 0 &&
    secondPassword.length > 0 &&
    email.length > 0;

  const [firstname, setFirstname] = useState('');
  const [surname, setSurname] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isShelterUserSelected, setIsShelterUserSelected] = useState(false);

  return (
    <SafeAreaViewStatus>
      <InnerContainer>
        <InputTextLabel text="First Name:" />
        <TextInput
          placeholder="First Name"
          value={firstname}
          onChangeText={text => setFirstname(text)}
          autoFocus={true}
        />
        <InputTextLabel text="Surname:" />
        <TextInput
          placeholder="Surname"
          value={surname}
          onChangeText={text => setSurname(text)}
          autoFocus={true}
        />
        <InputTextLabel text="Phone Number:" />
        <TextInput
          placeholder="Phone number"
          keyboardType="numeric"
          value={phoneNumber}
          onChangeText={text => setPhoneNumber(text)}
        />
        <InputTextLabel text="Email:" />
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={text => setEmail(text)}
        />
        <InputTextLabel text="Password:" />
        <TextInput //TODO - Add rules for password
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={text => setPassword(text)}
        />
        <InputTextLabel text="Password Again:" />
        <TextInput
          placeholder="Password Again"
          secureTextEntry
          onChangeText={text => setSecondPassword(text)}
        />
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
          disabled={!isButtonDisabled}
          handler={() => {
            if (email && password) {
              firebaseSignUp({
                email,
                password,
                userType: isShelterUserSelected
                  ? UserOptionType.SHELTER_USER
                  : UserOptionType.NORMAL_USER,
              })
                .then(() => {
                  dispatch(
                    signUpUser({
                      email,
                      firstname,
                      surname,
                      phoneNumber,
                      isShelterUser: isShelterUserSelected
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
    </SafeAreaViewStatus>
  );
};
