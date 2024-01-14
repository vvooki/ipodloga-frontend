import { createSlice } from '@reduxjs/toolkit';
import { addProject, getProjects, updateProject } from '../thunks/projectThunk';
import { REDUX_STATUSES } from '../../constants/constants';

const initialState = {
  projects: null,
  project: null,
  getProjectsStatus: null,
  addProjectStatus: null,
};

export const projectSlice = createSlice({
  name: 'project',
  initialState,
  reducers: {
    setProject: (state, { payload }) => {
      state.project = payload;
    },
  },
  extraReducers: (builder) => {
    // getProjectsList
    builder.addCase(getProjects.pending, (state) => {
      state.getProjectsStatus = REDUX_STATUSES.pending;
    });
    builder.addCase(getProjects.fulfilled, (state, { payload }) => {
      state.getProjectsStatus = REDUX_STATUSES.fulfilled;
      if (!payload) return;
      state.projects = payload;
    });
    builder.addCase(getProjects.rejected, (state) => {
      state.getProjectsStatus = REDUX_STATUSES.rejected;
    });

    // addProject
    builder.addCase(addProject.pending, (state) => {
      state.addProjectStatus = REDUX_STATUSES.pending;
    });
    builder.addCase(addProject.fulfilled, (state, { payload }) => {
      state.addProjectStatus = REDUX_STATUSES.fulfilled;
      if (!payload) return;
      state.projects.push(payload);
    });
    builder.addCase(addProject.rejected, (state) => {
      state.addProjectStatus = REDUX_STATUSES.rejected;
    });

    // updateProject
    builder.addCase(updateProject.pending, (state) => {
      state.addProjectStatus = REDUX_STATUSES.pending;
    });
    builder.addCase(updateProject.fulfilled, (state, { payload }) => {
      state.addProjectStatus = REDUX_STATUSES.fulfilled;
      if (!payload) return;
      state.projects = state.projects.map((project) => {
        console.log(project.id, payload.id);
        if (project.id === payload.id) {
          console.log('znalezione1');
          return {
            id: payload.id,
            name: payload.name,
            description: payload.description,
            status: payload.status,
            creationDateTime: payload.creationDateTime,
            completionDateTime: payload.completionDateTime,
          };
        }
        return project;
      });
    });
    builder.addCase(updateProject.rejected, (state) => {
      state.addProjectStatus = REDUX_STATUSES.rejected;
    });
  },
});

export const { setProject } = projectSlice.actions;

export default projectSlice.reducer;
