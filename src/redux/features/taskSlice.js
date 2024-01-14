import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  tasks: null,
  tasksForProject: null,
  task: null,
  getTasksStatus: null,
};

export const taskSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  // extraReducers: (builder) => {},
});

// export const { setProject } = taskSlice.actions;

export default taskSlice.reducer;
