import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getFilesForProject = createAsyncThunk(
  'file/getFilesForProject',
  async ({ projectId, token }, { rejectWithValue }) => {
    try {
      const res = await axios.get(
        `http://localhost:8080/api/files/${projectId}`,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        },
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const addFile = createAsyncThunk(
  'file/addFile',
  async ({ projectId, fileUrl, token }, { rejectWithValue }) => {
    try {
      console.log(projectId, fileUrl);
      const data = { projectId, file_url: fileUrl };
      const res = await axios.post(`http://localhost:8080/api/files`, data, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      return res.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);
