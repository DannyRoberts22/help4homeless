import React, {useState} from 'react';
import {SafeAreaViewStatus} from '@src/components/layout/SafeAreaViewStatus';
import TextInput from '@src/components/utility/text-input/TextInput';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '@src/types/navigation-types';
import screenNames from '@src/constants/screen-names';
import {InnerContainer} from '@src/components/layout/InnerContainer';
import {Spacer} from '@src/components/layout/Spacer';
import {theme} from '@src/theme';
import InputTextLabel from '@src/components/utility/input-text-label/InputTextLabel';
import {firebaseLogin} from '@src/services/authServices';
import {useAppDispatch, useAppSelector} from '@src/hooks/redux/reduxHooks';
import {loginUser} from '@src/store/redux/slices/userSlice';
import {ShareableButton} from '@src/components/organisms/shareable-button/ShareableButton';

type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList>;

export const LoginScreen = ({
  navigation,
}: {
  navigation: LoginScreenNavigationProp;
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useAppDispatch();

  const {loggedIn} = useAppSelector(state => state.user);
  console.log('loggenInLogin', loggedIn);
  return (
    <SafeAreaViewStatus>
      <InnerContainer>
        <InputTextLabel text="Email:" />
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={text => setEmail(text)}
          autoFocus={true}
          keyboardType="email-address"
        />
        <InputTextLabel text="Password:" />
        <TextInput
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={text => setPassword(text)}
        />
        <Spacer size={theme.space.xxl} />
        <ShareableButton
          color="white"
          text="Login"
          handler={() =>
            firebaseLogin(email, password)
              .then(userData => {
                dispatch(loginUser({isShelterUser: userData?.userType}));
              })
              .then(() =>
                navigation.navigate(screenNames.ACCOUNT_DRAWER_NAVIGATOR),
              )
              .catch(error => console.error(error))
          }
        />
        <Spacer size={theme.space.lg} />
        <ShareableButton
          color="white"
          text="Forgot Password"
          handler={() =>
            navigation.navigate(screenNames.FORGOTTON_PASSWORD_SCREEN)
          }
        />
        <Spacer size={theme.space.xxl} />
        <ShareableButton
          color="white"
          text="Sign Up"
          handler={() => navigation.navigate(screenNames.SIGNUP_SCREEN)}
        />
      </InnerContainer>
    </SafeAreaViewStatus>
  );
};
