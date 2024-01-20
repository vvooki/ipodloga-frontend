import { createSlice } from '@reduxjs/toolkit';
import {
  addProject,
  getProjectMembers,
  getProjects,
  getProjectsForStudent,
  updateProject,
} from '../thunks/projectThunk';
import { REDUX_STATUSES } from '../../constants/constants';

const initialState = {
  projects: null,
  project: null,
  projectMembersList: [],
  getProjectMembersStatus: null,
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

    // getProjectsListForStudent
    builder.addCase(getProjectsForStudent.pending, (state) => {
      state.getProjectsStatus = REDUX_STATUSES.pending;
    });
    builder.addCase(getProjectsForStudent.fulfilled, (state, { payload }) => {
      state.getProjectsStatus = REDUX_STATUSES.fulfilled;
      if (!payload) return;
      state.projects = payload;
    });
    builder.addCase(getProjectsForStudent.rejected, (state) => {
      state.getProjectsStatus = REDUX_STATUSES.rejected;
    });

    // getProjectMembers
    builder.addCase(getProjectMembers.pending, (state) => {
      state.getProjectMembersStatus = REDUX_STATUSES.pending;
    });
    builder.addCase(getProjectMembers.fulfilled, (state, { payload }) => {
      state.getProjectMembersStatus = REDUX_STATUSES.fulfilled;
      if (!payload) return;
      state.projectMembersList = payload;
    });
    builder.addCase(getProjectMembers.rejected, (state) => {
      state.getProjectMembersStatus = REDUX_STATUSES.rejected;
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
        if (project.id === payload.id) {
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
