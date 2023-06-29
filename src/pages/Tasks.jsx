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
const Tasks = () => {
  const { currentUser } = useContext(AuthContext);
  const location = useLocation();
  const projectId = location.pathname.split('/')[2];
  const [tasks, setTasks] = useState([]);
  const [project, setProject] = useState([]);
  const [members, setMembers] = useState([]);
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

  const getProject = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8080/projekty/${projectId}`
      );
      setProject(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getProjectTasks = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8080/zadania/projekty/${projectId}`
      );
      setTasks(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getProjectMembers = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8080/student/${projectId}/students`
      );
      setMembers(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getUser = (id) => {
    const u = members.find((m) => m.id === id);
    console.log('TUTAJ: ', u.imie);
  };

  useEffect(() => {
    getProjectMembers();
    getProjectTasks();
    getProject();
  }, []);

  const handleUpdateTaskUser = async (task, userId) => {
    console.log(task, userId);
    const data = {
      ...task,
      studentId: userId,
    };
    console.log('DANE USERA', data);
    try {
      const res = await axios.put(
        `http://localhost:8080/zadania/zadanie/${task.id}`,
        data
      );
      toast.success('Success! New user has been assigned to the task');
      getProjectTasks();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="tasks-section">
      <AddTask
        show={showTasks}
        close={handleModal}
        getTasks={getProjectTasks}
        projectId={projectId}
        editData={editData}
      />
      <AddMember
        show={showMember}
        close={handleModal}
        projectId={projectId}
        updateMembers={getProjectMembers}
      />
      <div className="top-container">
        <h2>{project.nazwa}</h2>
      </div>
      <div className="tasks-container container">
        <div className="top-container">
          <h3>Tasks</h3>
          <button onClick={() => handleModal(1)}>
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
          {tasks.map((task) => {
            const {
              id,
              nazwa,
              opis,
              status,
              type,
              priority,
              deadline,
              studentId,
            } = task;
            return (
              <div className="project-item table-grid" key={id}>
                <span>
                  <p>{nazwa}</p>
                </span>
                <span>
                  <p className={`badge ${type}`}>{type}</p>
                </span>
                <span>
                  <p className={`badge ${priority}`}>{priority}</p>
                </span>
                <span>
                  {opis.length > 40 ? `${opis.substring(0, 40)}...` : `${opis}`}
                </span>
                <span>
                  <p>{deadline}</p>
                </span>
                <span>
                  <p className={`badge ${status}`}>
                    {status.replace('_', ' ')}
                  </p>
                </span>
                <span>
                  {
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
                  }
                </span>
                <button
                  onClick={() => {
                    setEditData({ isEdit: true, ...task });
                    handleModal(1);
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
          <button onClick={() => handleModal(2)}>
            <MdOutlineAddBox className="add-icon" />
          </button>
        </div>
        <div className="members">
          {members.map((user) => {
            return (
              <span className="user" key={user.id}>
                <RxAvatar className="user-icon" />
                {(user.imie + ' ' + user.nazwisko).length <= 22
                  ? user.imie + ' ' + user.nazwisko
                  : (user.imie + ' ' + user.nazwisko).substring(0, 22) + '...'}
              </span>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Tasks;
