import {configureStore} from '@reduxjs/toolkit';
import {persistReducer, persistStore} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

import userReducer from '@src/store/redux/slices/userSlice';

const userPersistConfig = {
  key: 'user',
  storage: AsyncStorage,
};

export const store = configureStore({
  reducer: {
    user: persistReducer(userPersistConfig, userReducer),
  },
});

export const persistor = persistStore(store);

// Infer RootState and AppDispatch types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
