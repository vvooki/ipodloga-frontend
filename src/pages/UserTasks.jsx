import { useContext, useEffect, useState } from 'react';
import { MdOutlineAddBox } from 'react-icons/md';
import { HiOutlineDotsCircleHorizontal } from 'react-icons/hi';
import { BiSearchAlt } from 'react-icons/bi';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
const UserTasks = () => {
  const [tasks, setTasks] = useState([]);
  const { currentUser } = useContext(AuthContext);
  console.log(currentUser.uid);
  const getUserTasks = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8080/student/5Emt1bQrAagvM2FMYZW7/zadania`
      );
      setTasks(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getUserTasks();
  }, []);

  console.log(tasks);
  return (
    <section className="projects-section">
      <div className="top-container">
        <h2>Your current projects</h2>
        <button>
          CREATE NEW PROJECT <MdOutlineAddBox className="add-icon" />
        </button>
      </div>
      <div className="container projects-container">
        <span className="search-container">
          <label htmlFor="search">
            <BiSearchAlt className="search-icon" />
          </label>
          <input
            type="text"
            name="search"
            id="search"
            placeholder="Search..."
          />
        </span>
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
            const { id, nazwa, opis, status, type, priority, deadline } = task;
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
    </section>
  );
};

export default UserTasks;
