import React, {useState} from 'react';
import {SafeAreaViewStatus} from '@src/components/layout/SafeAreaViewStatus';
import {Alert, Button} from 'react-native';
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

  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  return (
    <SafeAreaViewStatus>
      <InnerContainer>
        <InputTextLabel text="Name:" />
        <TextInput
          placeholder="Name"
          value={name}
          onChangeText={text => setName(text)}
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
        <TextInput
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
        <Spacer size={theme.space.lg} />
        <Button
          color={theme.colors.white}
          title="Sign Up"
          disabled={!isButtonDisabled}
          onPress={() => {
            if (email && password) {
              firebaseSignUp(email, password)
                .then(() => {
                  dispatch(signUpUser({email, name, phoneNumber}));
                })
                .then(() => {
                  navigation.replace(screenNames.MAIN_NAVIGATOR, {
                    screen: screenNames.HOME_SCREEN,
                  });
                })
                .catch(error => {
                  Alert.alert('Error', error.message); //TODO - replace with error component
                });
            }
          }}
        />
        <Button
          color={theme.colors.white}
          title="Back to Login"
          onPress={() => {
            navigation.goBack();
          }}
        />
      </InnerContainer>
    </SafeAreaViewStatus>
  );
};
