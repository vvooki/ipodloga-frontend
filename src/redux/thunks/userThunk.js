import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const loginThunk = createAsyncThunk(
  'user/login',
  async (email, passowrd, { rejectWithValue }) => {
    try {
      const res = await axios.post(`http://localhost:8080/api/auth`);
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const fetchUserThunk = createAsyncThunk(
  'user/fetchUserThunk',
  async (uid, { rejectWithValue }) => {
    try {
      const res = await axios.get(`http://localhost:8080/api/students/${uid}`);
      console.log(res.data);
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);
