import screenNames from 'constants/screen-names'

export type RootStackParamList = {
[screenNames.HOME_SCREEN]: undefined,
[screenNames.ACCOUNT_SCREEN]: { name: string; },
[screenNames.ACCOUNT_NAVIGATOR]: undefined,
}