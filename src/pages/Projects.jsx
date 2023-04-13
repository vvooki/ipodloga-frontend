import { useState, useEffect } from 'react';
import { MdOutlineAddBox } from 'react-icons/md';
import { HiOutlineDotsCircleHorizontal } from 'react-icons/hi';
import './css/projects.css';
import { projects } from './../data/projects';
import AddProject from '../components/AddProject';
const Projects = () => {
  const [data, setData] = useState(projects);
  const [show, setShow] = useState('modal-hide');

  const handleOnClick = () => {
    if (show === 'modal-hide') {
      setShow('modal-show');
    } else {
      setShow('modal-hide');
    }
  };
  console.log(data);
  return (
    <section className="projects-section">
      <AddProject show={show} close={handleOnClick} />
      <div className="top-container">
        <h2>Your current projects</h2>
        <button onClick={handleOnClick}>
          CREATE NEW PROJECT <MdOutlineAddBox className="add-icon" />
        </button>
      </div>
      <div className="projects-container">
        <div className="table-header table-grid">
          <p>name</p>
          <p>description</p>
          <p>status</p>
          <p>start date</p>
          <p>deadline</p>
          <p>options</p>
        </div>
        {data.map((project) => {
          const { name, description, status, start_date, end_date } = project;
          return (
            <div className="project-item table-grid">
              <p>{name}</p>
              <p>{description}</p>
              <span>
                <p className={`status ${status}`}>{status}</p>
              </span>
              <p>{start_date}</p>
              <p>{end_date}</p>
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
