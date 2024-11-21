// src/services/authService.js
import auth from '@react-native-firebase/auth';

// Sign up a new user
export const signUp = async (email: string, password: string) => {
  return await auth().createUserWithEmailAndPassword(email, password);
};

// Login an existing user
export const login = async (email: string, password: string) => {
  return await auth().signInWithEmailAndPassword(email, password);
};

// Logout
export const logout = async () => {
  return await auth().signOut();
};

export const testFunction = () => {
  console.log('🚀 ~ testFunction');
};
