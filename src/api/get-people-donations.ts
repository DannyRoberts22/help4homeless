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
