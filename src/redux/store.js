import { configureStore } from '@reduxjs/toolkit';

import userReducer from './features/userSlice';
import projectReducer from './features/projectSlice';

export const store = configureStore({
  reducer: {
    project: projectReducer,
  },
});

export const RootState = store.getState();
export const AppDispatch = store.dispatch;
