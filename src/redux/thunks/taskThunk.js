import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getProjectTasks = createAsyncThunk(
  'tasks/getProjectTasks',
  async ({ projectId, token }, { rejectWithValue }) => {
    try {
      const res = await axios.get(
        `http://localhost:8080/api/task-projects/${projectId}`,
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

export const removeTaskFromProject = createAsyncThunk(
  'tasks/removeTaskFromProject',
  async ({ taskId, projectId, token }, { rejectWithValue }) => {
    try {
      const res = await axios.delete(
        `http://localhost:8080/api/task-projects/remove-from-project`,
        { taskId, projectId },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        },
      );
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const removeStudentFromTask = createAsyncThunk(
  'tasks/removeStudentFromTask',
  async ({ taskId, studentId, token }, { rejectWithValue }) => {
    try {
      const res = await axios.delete(
        `http://localhost:8080/api/task-students/unassign-from-student`,
        { taskId, studentId },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        },
      );
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const deleteTask = createAsyncThunk(
  'tasks/deleteTask',
  async ({ id, token }, { rejectWithValue }) => {
    try {
      const res = await axios.delete(`http://localhost:8080/api/tasks/${id}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      return id;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);
