import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { PeopleDonation } from './types';

export const firebaseGetPeopleDonations = async (): Promise<
  PeopleDonation[]
> => {
  try {
    const userId = auth()?.currentUser?.uid;
    if (!userId) throw new Error('No authenticated user found');

    const userRef = firestore().collection('Users').doc(userId);
    const userDoc = await userRef.get();

    if (!userDoc.exists) {
      throw new Error('User document not found');
    }

    const userData = userDoc.data();
    const donations = userData?.donations || [];

    return donations;
  } catch (error) {
    console.error('Error getting donations:', error);
    throw error;
  }
};

export const firebasePushPeopleDonation = async (
  donation: PeopleDonation,
): Promise<void> => {
  try {
    const userId = auth()?.currentUser?.uid;
    if (!userId) throw new Error('No authenticated user found');

    const userRef = firestore().collection('Users').doc(userId);

    await firestore().runTransaction(async transaction => {
      const userDoc = await transaction.get(userRef);

      if (!userDoc.exists) {
        throw new Error('User document not found');
      }

      const userData = userDoc.data();
      const currentDonations = userData?.donations || [];

      transaction.update(userRef, {
        donations: [...currentDonations, donation],
      });
    });

    console.log('Donation added successfully');
  } catch (error) {
    console.error('Error adding donation:', error);
    throw error;
  }
};
