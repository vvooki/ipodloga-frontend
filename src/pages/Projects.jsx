import { useState, useEffect } from 'react';
import { MdOutlineAddBox } from 'react-icons/md';
import { HiOutlineDotsCircleHorizontal } from 'react-icons/hi';
import './css/projects.css';
// import { projects } from './../data/projects';
import AddProject from '../components/AddProject';
import axios from 'axios';
const Projects = () => {
  const [data, setData] = useState([]);
  const [show, setShow] = useState('modal-hide');

  const handleOnClick = () => {
    if (show === 'modal-hide') {
      setShow('modal-show');
    } else {
      setShow('modal-hide');
    }
  };

  const getProducts = async () => {
    try {
      const res = await axios.get(`http://localhost:8080/projekty`);
      setData(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <section className="projects-section">
      <AddProject show={show} close={handleOnClick} />
      <div className="top-container">
        <h2>Your current projects</h2>
        <button onClick={handleOnClick}>
          CREATE NEW PROJECT <MdOutlineAddBox className="add-icon" />
        </button>
      </div>
      <div className="container projects-container">
        <div className="table-header table-grid">
          <p>name</p>
          <p>description</p>
          <p>status</p>
          <p>start date</p>
          <p>deadline</p>
          <p>options</p>
        </div>
        {data.map((project) => {
          const { id, nazwa, opis, dataczas_utworzenia, status } = project;
          return (
            <div className="project-item table-grid">
              <p>{nazwa}</p>
              <p>{opis}</p>
              <span>
                <p className={`status ${status ? 'in-progress' : 'finished'}`}>
                  {status ? 'git' : 'nie git'}
                </p>
              </span>
              <p>{dataczas_utworzenia}</p>
              <p>{dataczas_utworzenia}</p>
              <button>
                <p className="status">
                  <HiOutlineDotsCircleHorizontal />
                </p>
              </button>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Projects;
