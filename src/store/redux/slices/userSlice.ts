import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface UserState {
  name: string;
  email: string;
  phoneNumber: string;
  loggedIn: boolean;
}

const initialState: UserState = {
  name: '',
  email: '',
  phoneNumber: '',
  loggedIn: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginUser: state => {
      state.loggedIn = true;
    },
    logoutUser: state => {
      state.name = '';
      state.email = '';
      state.loggedIn = false;
    },
    updateEmailUser: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    signUpUser: (
      state,
      action: PayloadAction<{name: string; email: string; phoneNumber: string}>,
    ) => {
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.phoneNumber = action.payload.phoneNumber;
      state.loggedIn = true;
    },
  },
});

export const {loginUser, logoutUser, updateEmailUser, signUpUser} =
  userSlice.actions;
export default userSlice.reducer;
