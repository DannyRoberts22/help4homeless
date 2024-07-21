import {theme} from '@src/theme';
import {mapScreenIcons} from '@src/constants/screens';

type ScreenNameKey = keyof typeof mapScreenIcons;

const getIconName = (key: ScreenNameKey): string => {
  console.log('mapScreenIcons', mapScreenIcons);
  return mapScreenIcons[key].iconName;
};

const getScreenTitle = (key: ScreenNameKey): string => {
  console.log('mapScreenIcons', mapScreenIcons);
  return mapScreenIcons[key].title;
};

export const getMappedIcons = (route: {route: {name: string}}) => {
  return {
    iconName: getIconName(route?.route?.name as keyof typeof mapScreenIcons),
    size: 25,
    color: theme.colors.white,
    title: getScreenTitle(route?.route?.name as keyof typeof mapScreenIcons),
  };
};
