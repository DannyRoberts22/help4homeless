import screens, { ScreenNames } from './screens';

const screenNameConstants: ScreenNames = Object.keys(
  screens,
).reduce<ScreenNames>((acc, key) => {
  const screenKey = key as keyof typeof screens;
  return {
    ...acc,
    [screenKey]: screens[screenKey].name,
  };
}, {} as ScreenNames);

export default screenNameConstants;
