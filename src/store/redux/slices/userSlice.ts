import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { UserType } from '@src/types/auth-services-types';

// TODO Split this into two slices possibly
interface UserState {
  firstName?: string;
  surname?: string;
  businessName?: string;
  houseNameOrNumber?: string;
  addressLineOne?: string;
  addressLineTwo?: string;
  city?: string;
  postcode?: string;
  email: string;
  phoneNumber: string;
  loggedIn: boolean;
  userType: UserType | undefined;
}

const initialState: UserState = {
  firstName: '',
  surname: '',
  businessName: '',
  houseNameOrNumber: '',
  addressLineOne: '',
  addressLineTwo: '',
  city: '',
  postcode: '',
  email: '',
  phoneNumber: '',
  loggedIn: false,
  userType: undefined,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginUser: (
      state,
      action: PayloadAction<{
        userType: UserType | undefined;
      }>,
    ) => {
      state.loggedIn = true;
      state.userType = action.payload.userType;
    },
    logoutUser: state => {
      state.firstName = '';
      state.surname = '';
      state.email = '';
      state.loggedIn = false;
    },
    updateEmailUser: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    signUpUser: (
      state,
      action: PayloadAction<{
        firstName: string;
        surname: string;
        email: string;
        phoneNumber: string;
        userType: UserType | undefined;
      }>,
    ) => {
      state.firstName = action.payload.firstName;
      state.surname = action.payload.surname;
      state.email = action.payload.email;
      state.phoneNumber = action.payload.phoneNumber;
      state.loggedIn = true;
      state.userType = action.payload.userType;
    },
    signUpHomelessShelterUser: (
      state,
      action: PayloadAction<{
        businessName: string;
        houseNameOrNumber: string;
        addressLineOne: string;
        addressLineTwo: string;
        city: string;
        postcode: string;
        email: string;
        phoneNumber: string;
        userType: UserType | undefined;
      }>,
    ) => {
      state.businessName = action.payload.businessName;
      state.houseNameOrNumber = action.payload.houseNameOrNumber;
      state.addressLineOne = action.payload.addressLineOne;
      state.addressLineTwo = action.payload.addressLineTwo;
      state.city = action.payload.city;
      state.postcode = action.payload.postcode;
      state.email = action.payload.email;
      state.phoneNumber = action.payload.phoneNumber;
      state.loggedIn = true;
      state.userType = action.payload.userType;
    },
    deleteUser: state => {
      state.firstName = '';
      state.surname = '';
      state.businessName = '';
      state.houseNameOrNumber = '';
      state.addressLineOne = '';
      state.addressLineTwo = '';
      state.city = '';
      state.postcode = '';
      state.email = '';
      state.phoneNumber = '';
      state.loggedIn = false;
      state.userType = undefined;
    },
  },
});

export const {
  loginUser,
  logoutUser,
  updateEmailUser,
  signUpUser,
  signUpHomelessShelterUser,
  deleteUser,
} = userSlice.actions;
export default userSlice.reducer;
