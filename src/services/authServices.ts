// src/services/authService.js
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {UserDocument, UserType} from './types';

export const firebaseSignUp = async ({
  email,
  password,
  userType,
}: {
  email: string;
  password: string;
  userType: UserType;
}): Promise<void> => {
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
    const userDoc = await firestore().collection('users').doc(user.uid).get();

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

// Sign up a new user
// export const firebaseSignUp = async (email: string, password: string) => {
//   return await auth().createUserWithEmailAndPassword(email, password);
// };

// Login an existing user
// export const firebaseLogin = async (email: string, password: string) => {
//   return await auth().signInWithEmailAndPassword(email, password);
// };

// Signout
export const firebaseSignOut = async () => {
  return await auth().signOut();
};

// Reset password
export const firebaseResetPassword = async (email: string) => {
  return await auth().sendPasswordResetEmail(email);
};
