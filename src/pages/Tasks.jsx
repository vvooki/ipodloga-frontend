import { MdOutlineAddBox } from 'react-icons/md';
import './css/tasks.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { HiOutlineDotsCircleHorizontal } from 'react-icons/hi';
import { RxAvatar } from 'react-icons/rx';
import { useLocation } from 'react-router-dom';

const Tasks = () => {
  const location = useLocation();
  const projectId = location.pathname.split('/')[2];

  const [tasks, setTasks] = useState([]);
  const [project, setProject] = useState([]);

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
      <div className="top-container">
        <h2>{project.nazwa}</h2>
      </div>
      <div className="tasks-container container">
        <div className="top-container">
          <h3>Tasks</h3>
          <button>
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
          <p>options</p>
        </div>
        {tasks.map((project) => {
          const { id, nazwa, opis, dataczas_utworzenia, status } = project;
          return (
            <div className="project-item table-grid" key={id}>
              <p>{nazwa}</p>
              <span>
                <p className={`status ${status ? 'in-progress' : 'finished'}`}>
                  {status ? 'finished' : 'in progress'}
                </p>
              </span>
              <span>
                <p className={`status ${status ? 'in-progress' : 'finished'}`}>
                  {status ? 'finished' : 'in progress'}
                </p>
              </span>
              {opis.length > 40 ? `${opis.substring(0, 40)}...` : `${opis}`}
              <p>{dataczas_utworzenia}</p>
              <span>
                <p className={`status ${status ? 'in-progress' : 'finished'}`}>
                  {status ? 'finished' : 'in progress'}
                </p>
              </span>
              <button>
                <p className="status">
                  <HiOutlineDotsCircleHorizontal />
                </p>
              </button>
            </div>
          );
        })}
      </div>
      <div className="members-container container">
        <div className="top-container">
          <h3>Members</h3>
          <button>
            <MdOutlineAddBox className="add-icon" />
          </button>
        </div>
        <div className="members">
          <div className="user">
            <RxAvatar className="user-icon" /> John Cena
          </div>
          <div className="user">
            <RxAvatar className="user-icon" /> Mariusz Pudz...
          </div>
        </div>
      </div>
    </section>
  );
};

export default Tasks;
