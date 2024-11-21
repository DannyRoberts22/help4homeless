import React, {useState} from 'react';
import {SafeAreaViewStatus} from '@src/components/layout/SafeAreaViewStatus';
import {Alert, Button} from 'react-native';
import {useDispatch} from 'react-redux';
import TextInput from '@src/components/utility/text-input/TextInput';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '@src/types/navigation-types';
// import screenNames from '@src/constants/screen-names';
import {InnerContainer} from '@src/components/layout/InnerContainer';
import InputTextLabel from '@src/components/utility/input-text-label/InputTextLabel';
import {theme} from '@src/theme';
import {Spacer} from '@src/components/layout/Spacer';
import {signUp, testFunction} from '@src/services/authServices';
import {login} from '@src/store/redux/slices/userSlice';
// import {useAppwriteContext} from '@src/providers/AppwriteContext';

type SignupScreenNavigationProp = StackNavigationProp<RootStackParamList>;

export const SignupScreen = ({}: // navigation,
{
  navigation: SignupScreenNavigationProp;
}) => {
  // const context = useAppwriteContext();
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [secondPassword, setSecondPassword] = useState('');
  const isButtonDisabled =
    password === secondPassword &&
    password.length > 0 &&
    secondPassword.length > 0 &&
    email.length > 0;
  console.log('🚀 ~ testFunction:', testFunction());

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
          // onPress={() => {
          //   // context?.register(email, password, name).then(
          //   // () => {
          //   // Adjust the function call as necessary
          //   if (email && password) {
          //     signUp(email, password).then(() => {
          //       // Adjust the function call as necessary
          //       // navigation.replace(screenNames.MAIN_NAVIGATOR, {
          //       //   screen: screenNames.HOME_SCREEN,
          //       // });
          //       Alert.alert('user created');
          //       // }, // Adjust the function call as necessary
          //       // )
          //     });
          //   }
          // }}
          onPress={() => {
            if (email && password) {
              signUp(email, password)
                .then(() => {
                  dispatch(
                    login({name: name, email: email, phoneNumber: phoneNumber}),
                  );
                })
                .catch(error => {
                  Alert.alert('Error', error.message);
                });
            }
          }}
        />
      </InnerContainer>
    </SafeAreaViewStatus>
  );
};
