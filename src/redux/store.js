import { configureStore } from '@reduxjs/toolkit';

import userReducer from './features/userSlice';
import projectReducer from './features/projectSlice';
import taskReducer from './features/taskSlice';

export const store = configureStore({
  reducer: {
    project: projectReducer,
    task: taskReducer,
  },
});

export const RootState = store.getState();
export const AppDispatch = store.dispatch;
