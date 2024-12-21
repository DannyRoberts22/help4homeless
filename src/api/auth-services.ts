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
      email,
      userType,
      createdAt: firestore.FieldValue.serverTimestamp(),
      firstName,
      surname,
      phoneNumber,
    });

    console.log('User registered successfully:', user.uid);
  } catch (error) {
    console.error('Error registering user:', error);
    throw error;
  }
};

export const firebaseLogin = async (
  email: string,
  password: string,
): Promise<UserDocument | null> => {
  try {
    const userCredential = await auth().signInWithEmailAndPassword(
      email,
      password,
    );
    const user = userCredential.user;

    // Fetch user data from Firestore
    const userDoc = await firestore().collection('Users').doc(user.uid).get();

    if (userDoc.exists) {
      const userData = userDoc.data() as UserDocument;
      console.log('User logged in:', userData);
      return userData;
    } else {
      console.error('No user document found.');
      return null;
    }
  } catch (error) {
    console.error('Error signing in user:', error);
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

export const firebaseDeleteUser = async (userId: string): Promise<void> => {
  try {
    // 1. Delete the user's Firestore document
    await firestore().collection('Users').doc(userId).delete();
    console.log(`Firestore document for user ${userId} deleted successfully.`);

    // 2. Delete the user from Firebase Authentication
    const currentUser = auth().currentUser;

    if (currentUser?.uid === userId) {
      // If the user is currently signed in, delete them directly
      await currentUser.delete();
      console.log(`User ${userId} deleted successfully from Firebase Auth.`);
    } else {
      console.error(
        `The current user does not match the userId provided (${userId}). Ensure the user is signed in or an admin token is used.`,
      );
    }
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error; // Re-throw to handle this in the UI or higher layers.
  }
};
