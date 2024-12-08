import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {UserType} from '@src/types/auth-services-types';

interface UserState {
  firstName: string;
  surname: string;
  email: string;
  phoneNumber: string;
  loggedIn: boolean;
  userType: UserType | undefined;
}

const initialState: UserState = {
  firstName: '',
  surname: '',
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
    deleteUser: state => {
      state.firstName = '';
      state.surname = '';
      state.email = '';
      state.phoneNumber = '';
      state.loggedIn = false;
      state.userType = undefined;
    },
  },
});

export const {loginUser, logoutUser, updateEmailUser, signUpUser, deleteUser} =
  userSlice.actions;
export default userSlice.reducer;
