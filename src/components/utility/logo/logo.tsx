import * as CSS from './logo.styles';

export const Logo = () => {
  return (
    <CSS.Logo
      source={require('@src/assets/images/logo-4.png')}
      resizeMode="contain"
      testID="main-logo-img"
    />
  );
};