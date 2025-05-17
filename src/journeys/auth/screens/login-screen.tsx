import React, { useState } from 'react';
import { Text } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { GoogleSigninButton } from '@react-native-google-signin/google-signin';
import { firebaseLogin, loginWithGoogle } from '@src/api/auth-services';
import { InnerContainer } from '@src/components/layout/InnerContainer';
import { SafeAreaViewStatus } from '@src/components/layout/SafeAreaViewStatus';
import { Spacer } from '@src/components/layout/Spacer';
import { ShareableButton } from '@src/components/organisms/shareable-button/ShareableButton';
import InputTextLabel from '@src/components/utility/input-text-label/InputTextLabel';
import TextInput from '@src/components/utility/text-input/TextInput';
import screenNames from '@src/constants/screen-names';
import { useAppDispatch } from '@src/hooks/redux/reduxHooks';
import { loginUser } from '@src/store/redux/slices/userSlice';
import { theme } from '@src/theme';
import { RootStackParamList } from '@src/types/navigation-types';
import { Logo } from '@src/components/utility/logo/logo';
import { LogoContainer } from '@src/journeys/general-user/styles/login-screen.styles';

type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList>;

export const LoginScreen = ({
  navigation,
}: {
  navigation: LoginScreenNavigationProp;
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const dispatch = useAppDispatch();

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!email) newErrors.email = 'Email is required';
    if (!password) newErrors.password = 'Password is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const errorText = theme.fontStyles.errorText;

  const handleGooglePress = () => {
    loginWithGoogle()
      .then(userInfo => {
        console.log('Google login successful:', userInfo);
      })
      .catch(error => {
        console.error('Error logging in with Google:', error);
      });
  };
  return (
    <SafeAreaViewStatus>
      <InnerContainer>
        <LogoContainer>
          <Logo />
        </LogoContainer>
        <InputTextLabel text="Email:" />
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={text => setEmail(text)}
          autoFocus={true}
          keyboardType="email-address"
        />
        {errors.email && <Text style={errorText}>{errors.email}</Text>}
        <InputTextLabel text="Password:" />
        <TextInput
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={text => setPassword(text)}
        />
        {errors.password && <Text style={errorText}>{errors.password}</Text>}
        <Spacer size={theme.space.xxl} />
        <ShareableButton
          color="white"
          text="Login"
          handler={() => {
            if (validate()) {
              firebaseLogin(email, password)
                .then(userData => {
                  dispatch(loginUser({ userType: userData?.userType }));
                  setEmail('');
                  setPassword('');
                })
                .then(() =>
                  navigation.navigate(screenNames.ACCOUNT_DRAWER_NAVIGATOR),
                )
                .catch(error => console.error(error));
            }
          }}
        />
        <Spacer size={theme.space.sm} />
        <GoogleSigninButton
          size={GoogleSigninButton.Size.Standard} // Options: Icon, Standard, Wide
          color={GoogleSigninButton.Color.Light} // Options: Dark, Light
          onPress={handleGooglePress}
          style={{
            width: '100%',
            // height: 48,
          }}
        />
        <Spacer size={theme.space.xxl} />
        <ShareableButton
          color="white"
          text="Sign Up"
          handler={() =>
            navigation.navigate(screenNames.CHOOSE_USER_TYPE_SCREEN)
          }
        />
        <Spacer size={theme.space.md} />
        <ShareableButton
          color="white"
          text="Forgot Password"
          handler={() =>
            navigation.navigate(screenNames.FORGOTTON_PASSWORD_SCREEN)
          }
        />
      </InnerContainer>
    </SafeAreaViewStatus>
  );
};
