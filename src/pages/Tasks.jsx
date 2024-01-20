import { MdOutlineAddBox } from 'react-icons/md';
import './css/tasks.css';
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { HiOutlineDotsCircleHorizontal } from 'react-icons/hi';
import { RxAvatar } from 'react-icons/rx';
import { useLocation } from 'react-router-dom';
import AddTask from '../components/AddTask';
import AddMember from '../components/AddMember';
import toast from 'react-hot-toast';
import { AuthContext } from '../context/AuthContext';
import { useAppDispatch, useAppSelector } from '../hooks/useRedux';
import { format } from 'date-fns';
import { getProjectTasks } from '../redux/thunks/taskThunk';
import { getProjectMembers } from '../redux/thunks/projectThunk';
import { setTask } from '../redux/features/taskSlice';
const Tasks = () => {
  const { currentUser } = useContext(AuthContext);
  const location = useLocation();
  const projectId = location.pathname.split('/')[2];
  const defaultEditData = {
    isEdit: false,
    deadline: '',
    nazwa: '',
    opis: '',
    priority: '',
    status: '',
    type: '',
  };
  const [editData, setEditData] = useState(defaultEditData);
  const [showTasks, setShowTasks] = useState('modal-hide');
  const [showMember, setShowMember] = useState('modal-hide');

  const [isAddTaskModalVisible, setIsAddTaskModalVisible] = useState(false);
  const [isAddMemberModalVisible, setisAddMemberModalVisible] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const project = useAppSelector((state) => state.project.project);
  const tasks = useAppSelector((state) => state.task.tasks);
  const members = useAppSelector((state) => state.project.projectMembersList);
  const token = currentUser?.accessToken;

  const dispatch = useAppDispatch();

  const handleModal = (modal) => {
    if (currentUser.isAdmin) {
      if (modal === 1) {
        if (showTasks === 'modal-hide') {
          setShowTasks('modal-show');
        } else {
          setShowTasks('modal-hide');
          setEditData(defaultEditData);
        }
      } else if (modal === 2) {
        if (showMember === 'modal-hide') {
          setShowMember('modal-show');
        } else {
          setShowMember('modal-hide');
        }
      }
    } else {
      toast.error('You need admin permissions to open this window');
    }
  };

  useEffect(() => {
    dispatch(getProjectMembers({ projectId, token }));
    dispatch(getProjectTasks({ projectId, token }));
  }, [dispatch, projectId, token]);

  if (project && tasks)
    return (
      <section className="tasks-section">
        <AddTask
          show={isAddTaskModalVisible}
          close={() => setIsAddTaskModalVisible(false)}
          isEdit={isEdit}
          projectId={projectId}
        />
        <AddMember
          show={isAddMemberModalVisible}
          close={() => setisAddMemberModalVisible(false)}
          projectId={projectId}
          members={members}
        />
        <div className="top-container">
          <h2>{project.name}</h2>
        </div>
        <div className="tasks-container container">
          <div className="top-container">
            <h3>Tasks</h3>
            <button
              onClick={() => {
                setIsAddTaskModalVisible(true);
                setIsEdit(false);
              }}
            >
              CREATE NEW TASK <MdOutlineAddBox className="add-icon" />
            </button>
          </div>
          <div className="table-header table-grid">
            <p>name</p>
            <p>type</p>
            <p>Priority</p>
            <p>description</p>
            <p>deadline</p>
            <p>status</p>
            <p>user</p>
            <p>options</p>
          </div>
          <div className="tasks-list">
            {tasks &&
              tasks.map((task, index) => {
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
                  <div className="project-item table-grid" key={index}>
                    <span>
                      <p>{name}</p>
                    </span>
                    <span>
                      <p className={`badge ${task_type}`}>{task_type}</p>
                    </span>
                    <span>
                      <p className={`badge ${task_priority}`}>
                        {task_priority}
                      </p>
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
                    <span>
                      {/* {
                      <select
                        name="user"
                        value={studentId ? studentId : ''}
                        onChange={(e) =>
                          handleUpdateTaskUser(task, e.target.value)
                        }
                      >
                        {members.map((member) => {
                          return (
                            <option value={member.id} key={member.id}>
                              {member.imie} {member.nazwisko.substring(0, 1)}.
                            </option>
                          );
                        })}
                      </select>
                    } */}
                      test user
                    </span>
                    <button
                      onClick={() => {
                        dispatch(setTask(task));
                        setIsAddTaskModalVisible(true);
                        setIsEdit(true);
                      }}
                    >
                      <p>
                        <HiOutlineDotsCircleHorizontal />
                      </p>
                    </button>
                  </div>
                );
              })}
          </div>
        </div>
        <div className="members-container container">
          <div className="top-container">
            <h3>Members</h3>
            <button onClick={() => setisAddMemberModalVisible(true)}>
              <MdOutlineAddBox className="add-icon" />
            </button>
          </div>
          <div className="members">
            {members &&
              members.map((user) => {
                return (
                  <span className="user" key={user.id}>
                    <RxAvatar className="user-icon" />
                    {(user.firstName + ' ' + user.lastName).length <= 22
                      ? user.firstName + ' ' + user.lastName
                      : (user.firstName + ' ' + user.lastName).substring(
                          0,
                          22
                        ) + '...'}
                  </span>
                );
              })}
          </div>
        </div>
      </section>
    );
};

export default Tasks;
