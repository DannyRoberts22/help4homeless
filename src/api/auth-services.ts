// src/services/authService.js
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { GoogleAuthProvider } from '@firebase/auth';
import { UserDocument } from '../types/auth-services-types';

// Firebase -----------------------------

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

// Google -----------------------------
//TODO: Check this on real device
export const loginWithGoogle = async (): Promise<void> => {
  try {
    // Step 1: Retrieve Google user details
    const googleUser = __DEV__
      ? {
          user: {
            id: `mock-user-id-${Math.random().toString(36).substring(2, 10)}`,
            email: `mockuser+${Math.random()
              .toString(36)
              .substring(2, 10)}@example.com`,
            givenName: 'Mock',
            familyName: 'User',
          },
          idToken: `mock-id-token-${Math.random()
            .toString(36)
            .substring(2, 10)}`,
        }
      : await GoogleSignin.signIn();

    if ('user' in googleUser && googleUser.user.email && googleUser.idToken) {
      const { idToken, user } = googleUser;
      const { email } = user;
      console.log('does this run');
      console.log('🚀 ~ loginWithGoogle ~ email:', email);
      // Step 2: Check if the user exists in Firebase Authentication
      const existingUser = await auth().fetchSignInMethodsForEmail(email);

      if (existingUser.length > 0) {
        // Step 3: Log the user in if they already exist
        console.log('User exists, logging in...');
        const credential = GoogleAuthProvider.credential(idToken);
        await auth().signInWithCredential(credential);
        console.log('User logged in successfully with Google');
      } else {
        // Step 4: Sign the user up if they don't exist
        console.log('User does not exist, signing up...');
        const credential = GoogleAuthProvider.credential(idToken);
        const userCredential = await auth().signInWithCredential(credential);

        // Add additional user details to Firestore
        const userId = userCredential.user.uid;
        await firestore().collection('Users').doc(userId).set({
          userType: 'standard', // Adjust userType as needed
          firstName: user.givenName,
          surname: user.familyName,
          phoneNumber: '', // Optional, can be left empty
          email: userCredential.user.email,
          createdAt: firestore.FieldValue.serverTimestamp(),
        });

        console.log('User signed up successfully with Google');
      }
    }
  } catch (error) {
    console.error('Error during Google login/signup:', error);
    throw error;
  }
};
