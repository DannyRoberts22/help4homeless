import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {UserType} from '@src/services/types';

interface UserState {
  firstname: string;
  surname: string;
  email: string;
  phoneNumber: string;
  loggedIn: boolean;
  isShelterUser: UserType | undefined;
}

const initialState: UserState = {
  firstname: '',
  surname: '',
  email: '',
  phoneNumber: '',
  loggedIn: false,
  isShelterUser: undefined,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginUser: (
      state,
      action: PayloadAction<{
        isShelterUser: UserType | undefined;
      }>,
    ) => {
      state.loggedIn = true;
      state.isShelterUser = action.payload.isShelterUser;
    },
    logoutUser: state => {
      state.firstname = '';
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
        firstname: string;
        surname: string;
        email: string;
        phoneNumber: string;
        isShelterUser: UserType | undefined;
      }>,
    ) => {
      state.firstname = action.payload.firstname;
      state.surname = action.payload.surname;
      state.email = action.payload.email;
      state.phoneNumber = action.payload.phoneNumber;
      state.loggedIn = true;
      state.isShelterUser = action.payload.isShelterUser;
    },
  },
});

export const {loginUser, logoutUser, updateEmailUser, signUpUser} =
  userSlice.actions;
export default userSlice.reducer;
