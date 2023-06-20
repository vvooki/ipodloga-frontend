import { MdOutlineAddBox } from 'react-icons/md';
import './css/tasks.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { HiOutlineDotsCircleHorizontal } from 'react-icons/hi';
import { RxAvatar } from 'react-icons/rx';
import { useLocation } from 'react-router-dom';
import AddTask from '../components/AddTask';
import AddMember from '../components/AddMember';

const Tasks = () => {
  const location = useLocation();
  const projectId = location.pathname.split('/')[2];

  const [tasks, setTasks] = useState([]);
  const [project, setProject] = useState([]);
  const [showTasks, setShowTasks] = useState('modal-hide');
  const [showMember, setShowMember] = useState('modal-hide');

  const handleModal = (modal) => {
    if (modal === 1) {
      if (showTasks === 'modal-hide') {
        setShowTasks('modal-show');
      } else {
        setShowTasks('modal-hide');
      }
    } else if (modal === 2) {
      if (showMember === 'modal-hide') {
        setShowMember('modal-show');
      } else {
        setShowMember('modal-hide');
      }
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

  useEffect(() => {
    getProjectTasks();
    getProject();
  }, []);

  return (
    <section className="tasks-section">
      <AddTask
        show={showTasks}
        close={handleModal}
        getTasks={getProjectTasks}
        projectId={projectId}
      />
      <AddMember show={showMember} close={handleModal} projectId={projectId} />
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
          {tasks.map((project) => {
            const { id, nazwa, opis, status, type, priority, deadline } =
              project;
            return (
              <div className="project-item table-grid" key={id}>
                <span>
                  <p>{nazwa}</p>
                </span>
                <span>
                  <p className={``}>{type}</p>
                </span>
                <span>
                  <p className={``}>{priority}</p>
                </span>
                <span>
                  {opis.length > 40 ? `${opis.substring(0, 40)}...` : `${opis}`}
                </span>
                <span>
                  <p>{deadline}</p>
                </span>
                <span>
                  <p className={`${status}`}>{status.replace('_', ' ')}</p>
                </span>
                <span>
                  <p className={`${status}`}>{status.replace('_', ' ')}</p>
                </span>
                <button>
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
          <div className="user">
            <RxAvatar className="user-icon" /> John Cena
          </div>
        </div>
      </div>
    </section>
  );
};

export default Tasks;
