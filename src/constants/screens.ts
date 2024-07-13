export interface BaseScreenConfig {
    name: string;
    key: string;
  }

const screens = {
  //SCREENS
    HOME_SCREEN: { name: 'home.screen', key: 'home.screen'},
    ACCOUNT_SCREEN: { name: 'account.screen', key: 'account.screen'},

  //NAVIGATORS
    ACCOUNT_NAVIGATOR: { name: 'account.navigator', key: 'account.navigator' }
} as const

export type ScreenNames = {
    [K in keyof typeof screens]: (typeof screens)[K]['name'];
  };

const screenCopy: Record<keyof typeof screens, BaseScreenConfig> = screens;

export default screenCopy