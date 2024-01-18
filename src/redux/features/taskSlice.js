import { createSlice } from '@reduxjs/toolkit';
import { deleteTask, getProjectTasks } from '../thunks/taskThunk';
import { REDUX_STATUSES } from '../../constants/constants';

const initialState = {
  tasks: null,
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
