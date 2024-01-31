import { createSlice } from '@reduxjs/toolkit';
import { REDUX_STATUSES } from '../../constants/constants';
import { addFile, getFilesForProject } from '../thunks/fileThunk';

const initialState = {
  files: [],
  getFilesStatus: null,
  createFileStatus: null,
};

export const fileSlice = createSlice({
  name: 'file',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // getFilesForProject
    builder.addCase(getFilesForProject.pending, (state) => {
      state.getFilesStatus = REDUX_STATUSES.pending;
    });
    builder.addCase(getFilesForProject.fulfilled, (state, { payload }) => {
      state.getFilesStatus = REDUX_STATUSES.fulfilled;
      if (!payload) return;
      state.files = payload;
    });
    builder.addCase(getFilesForProject.rejected, (state) => {
      state.getFilesStatus = REDUX_STATUSES.rejected;
    });

    // createFile
    builder.addCase(addFile.pending, (state) => {
      state.createFileStatus = REDUX_STATUSES.pending;
    });
    builder.addCase(addFile.fulfilled, (state, { payload }) => {
      state.createFileStatus = REDUX_STATUSES.fulfilled;
      if (!payload) return;
      state.files = state.files.push(payload);
    });
    builder.addCase(addFile.rejected, (state) => {
      state.createFileStatus = REDUX_STATUSES.rejected;
    });

    // // deleteTask
    // builder.addCase(deleteTask.pending, (state) => {
    //   state.deleteTaskStatus = REDUX_STATUSES.pending;
    // });
    // builder.addCase(deleteTask.fulfilled, (state, { payload }) => {
    //   state.deleteTaskStatus = REDUX_STATUSES.fulfilled;
    //   if (!payload) return;
    //   console.log(payload);
    //   state.tasks = state.tasks.filter((task) => task.id !== payload);
    // });
    // builder.addCase(deleteTask.rejected, (state) => {
    //   state.deleteTaskStatus = REDUX_STATUSES.rejected;
    // });
  },
});

// export const { } = taskSlice.actions;

export default fileSlice.reducer;
