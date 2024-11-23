// src/services/authService.js
import auth from '@react-native-firebase/auth';

// Sign up a new user
export const firebaseSignUp = async (email: string, password: string) => {
  return await auth().createUserWithEmailAndPassword(email, password);
};

// Login an existing user
export const firebaseLogin = async (email: string, password: string) => {
  return await auth().signInWithEmailAndPassword(email, password);
};

// Signout
export const firebaseSignOut = async () => {
  return await auth().signOut();
};
