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
    login: (
      state,
      action: PayloadAction<{name: string; email: string; phoneNumber: string}>,
    ) => {
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.phoneNumber = action.payload.phoneNumber;
      state.loggedIn = true;
    },
    logout: state => {
      state.name = '';
      state.email = '';
      state.loggedIn = false;
    },
    updateEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
  },
});

export const {login, logout, updateEmail} = userSlice.actions;
export default userSlice.reducer;
