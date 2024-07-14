export interface BaseScreenConfig {
    name: string;
    key: string;
  }

const screens = {
  //SCREENS
    HOME_SCREEN: { name: 'home.screen', key: 'home.screen'},
    ACCOUNT_SCREEN: { name: 'account.screen', key: 'account.screen'},
    TEST_SCREEN: { name: 'test.screen', key: 'test.screen'},
    TEST_SCREEN_TWO: { name: 'test.screen.two', key: 'test.screen.two'},

  //NAVIGATORS
    ACCOUNT_NAVIGATOR: { name: 'account.navigator', key: 'account.navigator' },
    TAB_NAVIGATOR: { name: 'tab.navigator', key: 'tab.navigator' },
    TEST_NAVIGATOR: { name: 'test.navigator', key: 'test.navigator' },
} as const

export type ScreenNames = {
    [K in keyof typeof screens]: (typeof screens)[K]['name'];
  };

const screenCopy: Record<keyof typeof screens, BaseScreenConfig> = screens;

export default screenCopy