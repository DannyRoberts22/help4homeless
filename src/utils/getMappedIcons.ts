import { mapScreenIcons } from '@src/constants/screens';
import { theme } from '@src/theme';

type ScreenNameKey = keyof typeof mapScreenIcons;

const getIconName = (key: ScreenNameKey): string => {
  return mapScreenIcons[key].iconName;
};

const getScreenTitle = (key: ScreenNameKey): string => {
  return mapScreenIcons[key].title;
};

export const getMappedIcons = (route: { route: { name: string } }) => {
  return {
    iconName: getIconName(route?.route?.name as keyof typeof mapScreenIcons),
    size: 22,
    color: theme.colors.white,
    title: getScreenTitle(route?.route?.name as keyof typeof mapScreenIcons),
  };
};
