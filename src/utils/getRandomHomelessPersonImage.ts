export const getRandomHomelessPersonImage = () => {
  const randomNum: number = Math.floor(Math.random() * 20) + 1;
  const imageMap: { [key: number]: any } = {
    1: require('@src/assets/images/homeless-persons/homeless-person-1.png'),
    2: require('@src/assets/images/homeless-persons/homeless-person-2.png'),
    3: require('@src/assets/images/homeless-persons/homeless-person-3.png'),
    4: require('@src/assets/images/homeless-persons/homeless-person-4.png'),
    5: require('@src/assets/images/homeless-persons/homeless-person-5.png'),
    6: require('@src/assets/images/homeless-persons/homeless-person-6.png'),
    7: require('@src/assets/images/homeless-persons/homeless-person-7.png'),
    8: require('@src/assets/images/homeless-persons/homeless-person-8.png'),
    9: require('@src/assets/images/homeless-persons/homeless-person-9.png'),
    10: require('@src/assets/images/homeless-persons/homeless-person-10.png'),
    11: require('@src/assets/images/homeless-persons/homeless-person-11.png'),
    12: require('@src/assets/images/homeless-persons/homeless-person-12.png'),
    13: require('@src/assets/images/homeless-persons/homeless-person-13.png'),
    14: require('@src/assets/images/homeless-persons/homeless-person-14.png'),
    15: require('@src/assets/images/homeless-persons/homeless-person-15.png'),
    16: require('@src/assets/images/homeless-persons/homeless-person-16.png'),
    17: require('@src/assets/images/homeless-persons/homeless-person-17.png'),
    18: require('@src/assets/images/homeless-persons/homeless-person-18.png'),
    19: require('@src/assets/images/homeless-persons/homeless-person-19.png'),
    20: require('@src/assets/images/homeless-persons/homeless-person-20.png'),
  };
  return imageMap[randomNum];
};
