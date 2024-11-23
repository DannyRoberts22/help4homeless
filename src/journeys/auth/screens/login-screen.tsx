import React, {useState} from 'react';
import {SafeAreaViewStatus} from '@src/components/layout/SafeAreaViewStatus';
import {Button} from 'react-native';
import TextInput from '@src/components/utility/text-input/TextInput';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '@src/types/navigation-types';
import screenNames from '@src/constants/screen-names';
import {InnerContainer} from '@src/components/layout/InnerContainer';
import {Spacer} from '@src/components/layout/Spacer';
import {theme} from '@src/theme';
import InputTextLabel from '@src/components/utility/input-text-label/InputTextLabel';
import {firebaseLogin} from '@src/services/authServices';
import {useAppDispatch} from '@src/hooks/redux/reduxHooks';
import {loginUser} from '@src/store/redux/slices/userSlice';

type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList>;

export const LoginScreen = ({
  navigation,
}: {
  navigation: LoginScreenNavigationProp;
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useAppDispatch();
  return (
    <SafeAreaViewStatus>
      <InnerContainer>
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
        <Button
          color={theme.colors.white}
          title="Login"
          onPress={() =>
            firebaseLogin(email, password)
              .then(() => {
                dispatch(loginUser());
              })
              .then(() =>
                navigation.navigate(screenNames.ACCOUNT_DRAWER_NAVIGATOR),
              )
              .catch(error => console.error(error))
          }
        />
        <Spacer size={theme.space.md} />
        <Button
          color={theme.colors.white}
          title="Forgot Password?"
          onPress={() =>
            navigation.navigate(screenNames.FORGOTTON_PASSWORD_SCREEN)
          }
        />
        <Spacer size={theme.space.lg} />
        <Spacer size={theme.space.lg} />
        <Button
          color={theme.colors.white}
          title="Sign Up"
          onPress={() => navigation.navigate(screenNames.SIGNUP_SCREEN)}
        />
      </InnerContainer>
    </SafeAreaViewStatus>
  );
};
