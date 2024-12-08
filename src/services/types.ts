import {FirebaseFirestoreTypes} from '@react-native-firebase/firestore';

export type UserType = (typeof UserOptionType)[keyof typeof UserOptionType];

export const UserOptionType = {
  NORMAL_USER: 'normalUser',
  SHELTER_USER: 'shelterUser',
} as const;

export interface UserDocument {
  email: string;
  userType: UserType;
  createdAt: FirebaseFirestoreTypes.Timestamp;
}
