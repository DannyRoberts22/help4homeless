import firestore from '@react-native-firebase/firestore';

import { HomelessPerson } from './types';

// Add person to HomelessPersons Firestore collection
export const firebaseAddHomelessPerson = async (person: any): Promise<void> => {
  try {
    // Create a document reference with auto-generated ID
    const docRef = firestore().collection('HomelessPersons').doc();

    // Add the ID and QR code to the person object
    const personWithId = {
      ...person,
      id: docRef.id,
    };

    // Save the document in Firestore
    await docRef.set(personWithId);
    // console.log('Person added successfully:', personWithIdAndQR);
  } catch (error) {
    console.error('Error adding person:', error);
    throw error;
  }
};

// Get homeless persons from HomelessPersons Firestore collection including their id
export const firebaseGetHomelessPersons = async (): Promise<any[]> => {
  try {
    const homelessPersons = await firestore()
      .collection('HomelessPersons')
      .get();
    const persons = homelessPersons.docs.map(doc => ({
      person: doc.data(),
      id: doc.id,
    }));
    // console.log('Persons retrieved successfully:', persons);
    return persons;
  } catch (error) {
    console.error('Error retrieving persons:', error);
    throw error;
  }
};

// Get homeless person from HomelessPersons Firestore collection by id
export const firebaseGetHomelessPersonById = async (
  id: string,
): Promise<HomelessPerson> => {
  try {
    const homelessPerson = await firestore()
      .collection('HomelessPersons')
      .doc(id)
      .get();
    console.log('Person retrieved successfully:', homelessPerson.data());
    const data = homelessPerson.data();
    if (!data) {
      throw new Error('Homeless person not found');
    }
    return {
      firstName: data.firstName,
      surname: data.surname,
      phoneNumber: data.phoneNumber,
      email: data.email,
      id: homelessPerson.id,
      lastQrCodeExpiryDate: data.lastQrCodeExpiryDate,
      dateOfBirth: data.dateOfBirth,
      gender: data.gender,
    };
  } catch (error) {
    console.error('Error retrieving person:', error);
    throw error;
  }
};

// Delete homeless person from HomelessPersons Firestore collection by id
export const firebaseDeleteHomelessPerson = async (
  id: string,
): Promise<void> => {
  try {
    await firestore().collection('HomelessPersons').doc(id).delete();
    console.log('Person deleted successfully:', id);
  } catch (error) {
    console.error('Error deleting person:', error);
    throw error;
  }
};

export const firebaseUpdateHomelessPersonQrCodeExpiry = async ({
  id,
  lastQrCodeExpiryDate,
}: {
  id: string;
  lastQrCodeExpiryDate: number;
}): Promise<void> => {
  try {
    await firestore()
      .collection('HomelessPersons')
      .doc(id)
      .update({ lastQrCodeExpiryDate });
    console.log('Person updated successfully:', id);
  } catch (error) {
    console.error('Error updating person:', error);
    throw error;
  }
};
