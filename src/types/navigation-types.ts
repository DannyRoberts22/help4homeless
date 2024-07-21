import screenNames from '@src/constants/screen-names';

export type RootStackParamList = {
  [screenNames.HOME_SCREEN]: undefined;
  [screenNames.LOGIN_SCREEN]: undefined;
  [screenNames.SIGNUP_SCREEN]: undefined;
  [screenNames.FORGOTTON_PASSWORD_SCREEN]: undefined;
  [screenNames.DASHBOARD_SCREEN]: undefined;
  [screenNames.MANAGE_SCREEN]: undefined;
  [screenNames.PROFILE_SCREEN]: undefined;
  [screenNames.ABOUT_SCREEN]: undefined;
  [screenNames.QR_SCAN_SCREEN]: undefined;
  [screenNames.MY_DONATION_SCREEN]: undefined;
  [screenNames.NOTIFICATION_SCREEN]: undefined;
  [screenNames.MAIN_NAVIGATOR]: {screen: string};
  [screenNames.AUTH_NAVIGATOR]: undefined;
  [screenNames.GENERAL_USER_NAVIGATOR]: undefined;
  [screenNames.SHELTER_USER_NAVIGATOR]: undefined;
};
