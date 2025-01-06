import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';

export type UserType = (typeof UserOptionType)[keyof typeof UserOptionType];

export const UserOptionType = {
  STANDARD_USER: 'standardUser',
  SHELTER_USER: 'shelterUser',
} as const;

export interface UserDocument {
  email: string;
  password: string;
  userType: UserType;
  createdAt?: FirebaseFirestoreTypes.Timestamp;
  firstName?: string;
  surname?: string;
  phoneNumber?: string;
}

//TODO: move this to the types folder
