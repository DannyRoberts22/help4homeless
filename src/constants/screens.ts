export interface BaseScreenConfig {
  name: string;
  key: string;
}

const screens = {
  //SCREENS
  HOME_SCREEN: {name: 'home.screen', key: 'home.screen'},
  ACCOUNT_SCREEN: {name: 'account.screen', key: 'account.screen'},
  LOGIN_SCREEN: {name: 'login.screen', key: 'login.screen'},
  SIGNUP_SCREEN: {name: 'signup.screen', key: 'signup.screen'},
  FORGOTTON_PASSWORD_SCREEN: {
    name: 'fogotten-password.screen',
    key: 'fogotten-password.screen',
  },
  DASHBOARD_SCREEN: {name: 'dashboard.screen', key: 'dashboard.screen'},
  MANAGE_SCREEN: {name: 'manage.screen', key: 'manage.screen'},
  PROFILE_SCREEN: {name: 'profile.screen', key: 'profile.screen'},
  ABOUT_SCREEN: {name: 'about.screen', key: 'about.screen'},
  QR_SCAN_SCREEN: {name: 'qr-scan.screen', key: 'qr-scan.screen'},
  MY_DONATION_SCREEN: {name: 'my-donation.screen', key: 'my-donation.screen'},
  NOTIFICATION_SCREEN: {
    name: 'notification.screen',
    key: 'notification.screen',
  },

  //NAVIGATORS
  GENERAL_USER_NAVIGATOR: {
    name: 'general-user.navigator',
    key: 'general-user.navigator',
  },
  SHELTER_USER_NAVIGATOR: {
    name: 'shelter-user.navigator',
    key: 'shelter-user.navigator',
  },
  AUTH_NAVIGATOR: {name: 'auth.navigator', key: 'auth.navigator'},
  ROOT_NAVIGATOR: {name: 'root.navigator', key: 'root.navigator'},
  MAIN_NAVIGATOR: {name: 'main.navigator', key: 'main.navigator'},
  ACCOUNT_DRAWER_NAVIGATOR: {
    name: 'account-drawer.navigator',
    key: 'account-drawer.navigator',
  },
} as const;

export type ScreenNames = {
  [K in keyof typeof screens]: (typeof screens)[K]['name'];
};

const screenCopy: Record<keyof typeof screens, BaseScreenConfig> = screens;

export const mapScreenIcons = {
  'home.screen': {iconName: 'home', title: 'Home'},
  'account.screen': {iconName: 'account', title: 'Account'},
  'login.screen': {iconName: 'login', title: 'Login'},
  'signup.screen': {iconName: 'signup', title: 'Signup'},
  'fogotten-password.screen': {iconName: 'forgot', title: 'Forgot'},
  'dashboard.screen': {iconName: 'tasks', title: 'Dashboard'},
  'manage.screen': {iconName: 'globe', title: 'Manage'},
  'profile.screen': {iconName: 'user-plus', title: 'Profile'},
  'about.screen': {iconName: 'info-circle', title: 'About'},
  'qr-scan.screen': {iconName: 'qrcode', title: 'QR Code'},
  'my-donation.screen': {iconName: 'thermometer', title: 'Donation'},
  'notification.screen': {iconName: 'bell-o', title: 'Notifications'},
} as const;

export default screenCopy;
