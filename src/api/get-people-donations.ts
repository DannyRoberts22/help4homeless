import {
  PeopleDonations,
  PeopleDonationsData,
} from '@src/types/people-donations-api-types';

export const getPeopleDonations = async (): Promise<PeopleDonations[]> => {
  try {
    const response = await fetch(
      `https://randomuser.me/api/?results=${
        Math.floor(Math.random() * 10) + 1
      }`,
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: PeopleDonationsData = await response.json();
    return data.results;
  } catch (error) {
    console.error('Error fetching people donations:', error);

    if (error instanceof Error) {
      throw new Error(`Failed to fetch people donations: ${error.message}`);
    } else {
      throw new Error(
        'An unknown error occurred while fetching people donations',
      );
    }
  }
};

// TODO can get rid of this when we have a real data
// get random user profile image
export const getRandomUserProfileImage = async (): Promise<string> => {
  try {
    const response = await fetch('https://randomuser.me/api/');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data.results[0].picture.large;
  } catch (error) {
    console.error('Error fetching random user profile image:', error);
    throw new Error('Failed to fetch random user profile image');
  }
};
