import { useContext, useEffect, useState } from 'react';
import { MdOutlineAddBox } from 'react-icons/md';
import { HiOutlineDotsCircleHorizontal } from 'react-icons/hi';
import { BiSearchAlt } from 'react-icons/bi';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { useAppDispatch, useAppSelector } from '../hooks/useRedux';
import { getStudentTasks } from '../redux/thunks/taskThunk';
import { format } from 'date-fns';
const UserTasks = () => {
  const { currentUser } = useContext(AuthContext);

  const dispatch = useAppDispatch();
  console.log(currentUser.uid);

  const tasks = useAppSelector((state) => state.task.tasks);

  useEffect(() => {
    dispatch(
      getStudentTasks({
        studentId: currentUser.id,
        token: currentUser.accessToken,
      }),
    );
  }, []);

  return (
    <section className="projects-section">
      <div className="top-container">
        <h2>YOUR TASKS</h2>
      </div>
      <div className="container projects-container">
        <div className="table-header table-grid">
          <p>name</p>
          <p>type</p>
          <p>Priority</p>
          <p>description</p>
          <p>deadline</p>
          <p>status</p>
        </div>
        <div className="tasks-list">
          {tasks.map((task) => {
            const {
              id,
              name,
              description,
              task_status,
              task_type,
              task_priority,
              deadline,
            } = task;
            return (
              <div className="project-item table-grid" key={id}>
                <span>
                  <p>{name}</p>
                </span>
                <span>
                  <p className={`badge ${task_type}`}>{task_type}</p>
                </span>
                <span>
                  <p className={`badge ${task_priority}`}>{task_priority}</p>
                </span>
                <span>
                  {description.length > 40
                    ? `${description.substring(0, 40)}...`
                    : `${description}`}
                </span>
                <span>
                  <p>{format(deadline, 'dd.MM.yyyy')}</p>
                </span>
                <span>
                  <p className={`badge ${task_status}`}>
                    {task_status.replace('_', ' ')}
                  </p>
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default UserTasks;
