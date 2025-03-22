// src/services/authService.js
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

import { UserDocument } from '../types/auth-services-types';

export const firebaseSignUp = async ({
  email,
  password,
  userType,
  firstName,
  surname,
  phoneNumber,
}: UserDocument): Promise<void> => {
  try {
    // Create the user
    const userCredential = await auth().createUserWithEmailAndPassword(
      email,
      password,
    );
    const user = userCredential.user;
    console.log('🚀 ~ user:', user);

    // Save the user type in Firestore
    await firestore().collection('Users').doc(user.uid).set({
      firstName,
      surname,
      email,
      userType,
      createdAt: firestore.FieldValue.serverTimestamp(),
      phoneNumber,
      donations: [],
    });

    console.log('User registered successfully:', user.uid);
  } catch (error) {
    console.error('Error registering user:', error);
    throw error;
  }
};

// Function to sign up a shelter user
export const firebaseSignUpHomelessShelterUser = async ({
  email,
  password,
  businessName,
  houseNameOrNumber,
  addressLineOne,
  addressLineTwo,
  city,
  postcode,
  phoneNumber,
  userType,
}: {
  email: string;
  password: string;
  businessName: string;
  houseNameOrNumber: string;
  addressLineOne: string;
  addressLineTwo?: string;
  city: string;
  postcode: string;
  phoneNumber: string;
  userType: string;
}): Promise<void> => {
  try {
    const userCredential = await auth().createUserWithEmailAndPassword(
      email,
      password,
    );
    const user = userCredential.user;

    await firestore().collection('HomelessShelters').doc(user.uid).set({
      email,
      businessName,
      houseNameOrNumber,
      addressLineOne,
      addressLineTwo,
      city,
      postcode,
      phoneNumber,
      userType,
      createdAt: firestore.FieldValue.serverTimestamp(),
    });

    console.log('Shelter user registered successfully:', user.uid);
  } catch (error) {
    console.error('Error registering shelter user:', error);
    throw error;
  }
};

// export const firebaseLogin = async (
//   email: string,
//   password: string,
// ): Promise<UserDocument | null> => {
//   try {
//     const userCredential = await auth().signInWithEmailAndPassword(
//       email,
//       password,
//     );
//     const user = userCredential.user;

//     // Fetch user data from Firestore
//     const userDoc = await firestore().collection('Users').doc(user.uid).get();

//     if (userDoc.exists) {
//       const userData = userDoc.data() as UserDocument;
//       console.log('User logged in:', userData);
//       return userData;
//     } else {
//       console.error('No user document found.');
//       return null;
//     }
//   } catch (error) {
//     console.error('Error signing in user:', error);
//     throw error;
//   }
// };

export const firebaseLogin = async (
  email: string,
  password: string,
): Promise<UserDocument | null> => {
  try {
    // Step 1: Authenticate with Firebase
    const userCredential = await auth().signInWithEmailAndPassword(
      email,
      password,
    );
    const user = userCredential.user;

    // Step 2: Check in `Users` collection
    const userDoc = await firestore().collection('Users').doc(user.uid).get();
    if (userDoc.exists) {
      return userDoc.data() as UserDocument;
    }

    // Step 3: Check in `HomelessShelters` collection
    const shelterDoc = await firestore()
      .collection('HomelessShelters')
      .doc(user.uid)
      .get();
    if (shelterDoc.exists) {
      return shelterDoc.data() as UserDocument;
    }

    // If neither collection has the user's data
    console.error('No user or homeless shelter document found for:', user.uid);
    return null;
  } catch (error) {
    console.error('Error logging in user or shelter:', error);
    throw error;
  }
};

// Signout
export const firebaseSignOut = async () => {
  return await auth().signOut();
};

// Reset password
export const firebaseResetPassword = async (email: string) => {
  return await auth().sendPasswordResetEmail(email);
};

// export const firebaseDeleteUser = async (userId: string): Promise<void> => {
//   try {
//     // 1. Delete the user's Firestore document
//     await firestore().collection('Users').doc(userId).delete();
//     console.log(`Firestore document for user ${userId} deleted successfully.`);

//     // 2. Delete the user from Firebase Authentication
//     const currentUser = auth().currentUser;

//     if (currentUser?.uid === userId) {
//       // If the user is currently signed in, delete them directly
//       await currentUser.delete();
//       console.log(`User ${userId} deleted successfully from Firebase Auth.`);
//     } else {
//       console.error(
//         `The current user does not match the userId provided (${userId}). Ensure the user is signed in or an admin token is used.`,
//       );
//     }
//   } catch (error) {
//     console.error('Error deleting user:', error);
//     throw error; // Re-throw to handle this in the UI or higher layers.
//   }
// };

export const firebaseDeleteUser = async (userId: string): Promise<void> => {
  try {
    let collectionType: 'Users' | 'HomelessShelters' | null = null;

    // Step 1: Determine collection type dynamically
    const userDoc = await firestore().collection('Users').doc(userId).get();
    if (userDoc.exists) {
      collectionType = 'Users';
    } else {
      const shelterDoc = await firestore()
        .collection('HomelessShelters')
        .doc(userId)
        .get();
      if (shelterDoc.exists) {
        collectionType = 'HomelessShelters';
      }
    }

    if (!collectionType) {
      console.error(
        `No document found for userId ${userId} in any collection.`,
      );
      throw new Error(
        `User ${userId} not found in Users or HomelessShelters collections.`,
      );
    }

    // Step 2: Delete Firestore document
    await firestore().collection(collectionType).doc(userId).delete();
    console.log(
      `Firestore document for user ${userId} successfully deleted from ${collectionType} collection.`,
    );

    // Step 3: Delete from Firebase Authentication
    const currentUser = auth().currentUser;

    if (currentUser?.uid === userId) {
      // If the user is currently signed in, delete them directly
      await currentUser.delete();
      console.log(
        `User ${userId} successfully deleted from Firebase Authentication.`,
      );
    } else {
      console.warn(
        `The current user does not match the userId (${userId}). If required, ensure they are signed in or use admin credentials to delete.`,
      );
    }
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
};
