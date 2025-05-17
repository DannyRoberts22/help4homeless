import screenNames from '@src/constants/screen-names';

export type RootStackParamList = {
  [screenNames.HOME_SCREEN]: undefined;
  [screenNames.LOGIN_SCREEN]: undefined;
  [screenNames.SIGNUP_SCREEN]: undefined;
  [screenNames.HOMELESS_SHELTER_SIGNUP_SCREEN]: undefined;
  [screenNames.CHOOSE_USER_TYPE_SCREEN]: undefined;
  [screenNames.FORGOTTON_PASSWORD_SCREEN]: undefined;
  [screenNames.DASHBOARD_SCREEN]: undefined;
  [screenNames.MANAGE_SCREEN]: undefined;
  [screenNames.PROFILE_SCREEN]: undefined;
  [screenNames.ABOUT_SCREEN]: undefined;
  [screenNames.QR_SCAN_SCREEN]: { homelessPersonId: string };
  [screenNames.MY_DONATION_SCREEN]: undefined;
  [screenNames.NOTIFICATION_SCREEN]: undefined;
  [screenNames.HOMELESS_PERSON_PROFILE_MODAL]: { id: string };
  [screenNames.MAIN_NAVIGATOR]: undefined;
  [screenNames.AUTH_NAVIGATOR]: undefined;
  [screenNames.ACCOUNT_DRAWER_NAVIGATOR]: undefined;
  [screenNames.GENERAL_USER_NAVIGATOR]: undefined;
  [screenNames.SHELTER_USER_NAVIGATOR]: undefined;
  [screenNames.CHECKOUT_MODAL]: undefined;
};
