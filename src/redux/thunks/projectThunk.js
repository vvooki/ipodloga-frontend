import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getProjects = createAsyncThunk(
  'project/getProjects',
  async ({ page, limit, token }, { rejectWithValue }) => {
    try {
      const res = await axios.get(
        `http://localhost:8080/api/projects?page=${page}&pageSize=${limit}`,
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

export const getProjectsForStudent = createAsyncThunk(
  'project/getProjectsForStudent',
  async ({ id, page, limit, token }, { rejectWithValue }) => {
    try {
      const res = await axios.get(
        `http://localhost:8080/api/student-projects/projects/${id}?page=${page}&pageSize=${limit}`,
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

export const addProject = createAsyncThunk(
  'project/addProject',
  async ({ project, token }, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `http://localhost:8080/api/projects`,
        project,
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

export const updateProject = createAsyncThunk(
  'project/updateProject',
  async ({ id, project, token }, { rejectWithValue }) => {
    try {
      const res = await axios.put(
        `http://localhost:8080/api/projects/${id}`,
        project,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        },
      );
      console.log('TUTAJ', res.data);
      return res.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const getProjectMembers = createAsyncThunk(
  'project/projectMembers',
  async ({ projectId, token }, { rejectWithValue }) => {
    try {
      const res = await axios.get(
        `http://localhost:8080/api/student-projects/students/${projectId}`,
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
