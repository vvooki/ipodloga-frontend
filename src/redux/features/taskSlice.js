import { createSlice } from '@reduxjs/toolkit';
import {
  addTask,
  deleteTask,
  getProjectTasks,
  getStudentTasks,
  updateTask,
} from '../thunks/taskThunk';
import { REDUX_STATUSES } from '../../constants/constants';

const initialState = {
  tasks: [],
  tasksForProject: null,

  task: null,
  getTasksStatus: null,
  deleteTaskStatus: null,
};

export const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    setTask: (state, { payload }) => {
      state.task = payload;
    },
  },
  extraReducers: (builder) => {
    // getProjectTasksList
    builder.addCase(getProjectTasks.pending, (state) => {
      state.getTasksStatus = REDUX_STATUSES.pending;
    });
    builder.addCase(getProjectTasks.fulfilled, (state, { payload }) => {
      state.getTasksStatus = REDUX_STATUSES.fulfilled;
      if (!payload) return;
      state.tasks = payload;
    });
    builder.addCase(getProjectTasks.rejected, (state) => {
      state.getTasksStatus = REDUX_STATUSES.rejected;
    });

    // getStudentTasksList
    builder.addCase(getStudentTasks.pending, (state) => {
      state.getTasksStatus = REDUX_STATUSES.pending;
    });
    builder.addCase(getStudentTasks.fulfilled, (state, { payload }) => {
      state.getTasksStatus = REDUX_STATUSES.fulfilled;
      if (!payload) return;
      state.tasks = payload;
    });
    builder.addCase(getStudentTasks.rejected, (state) => {
      state.getTasksStatus = REDUX_STATUSES.rejected;
    });

    // addTask
    builder.addCase(addTask.pending, (state) => {
      state.getTasksStatus = REDUX_STATUSES.pending;
    });
    builder.addCase(addTask.fulfilled, (state, { payload }) => {
      state.getTasksStatus = REDUX_STATUSES.fulfilled;
      if (!payload) return;
      state.tasks.push(payload);
    });
    builder.addCase(addTask.rejected, (state) => {
      state.getTasksStatus = REDUX_STATUSES.rejected;
    });

    // updateTask
    builder.addCase(updateTask.pending, (state) => {
      state.getTasksStatus = REDUX_STATUSES.pending;
    });
    builder.addCase(updateTask.fulfilled, (state, { payload }) => {
      state.getTasksStatus = REDUX_STATUSES.fulfilled;
      if (!payload) return;
      state.tasks = state.tasks.map((task) => {
        if (task.id === payload.id) {
          return payload;
        }
        return task;
      });
    });
    builder.addCase(updateTask.rejected, (state) => {
      state.getTasksStatus = REDUX_STATUSES.rejected;
    });

    // deleteTask
    builder.addCase(deleteTask.pending, (state) => {
      state.deleteTaskStatus = REDUX_STATUSES.pending;
    });
    builder.addCase(deleteTask.fulfilled, (state, { payload }) => {
      state.deleteTaskStatus = REDUX_STATUSES.fulfilled;
      if (!payload) return;
      state.tasks = state.tasks.map((task) => {
        if (task.id !== payload) {
          return task;
        }
        return;
      });
    });
    builder.addCase(deleteTask.rejected, (state) => {
      state.deleteTaskStatus = REDUX_STATUSES.rejected;
    });
  },
});

export const { setTask } = taskSlice.actions;

export default taskSlice.reducer;
