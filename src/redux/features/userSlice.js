import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: undefined,
  fetchUserStatus: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearUser: (state) => {
      state.user = null;
    },
  },
  // extraReducers: (builder) => {},
});

export const { clearUser } = userSlice.actions;

export default userSlice.reducer;
