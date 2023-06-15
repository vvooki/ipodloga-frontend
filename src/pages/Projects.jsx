import { useState, useEffect } from 'react';
import { MdOutlineAddBox } from 'react-icons/md';
import { HiOutlineDotsCircleHorizontal } from 'react-icons/hi';
import { BiSearchAlt } from 'react-icons/bi';
import './css/projects.css';
// import { projects } from './../data/projects';
import AddProject from '../components/AddProject';
import axios from 'axios';
import { Link } from 'react-router-dom';
const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [data, setData] = useState([]);
  const [show, setShow] = useState('modal-hide');
  const [search, setSearch] = useState('');

  const handleOnClick = () => {
    if (show === 'modal-hide') {
      setShow('modal-show');
    } else {
      setShow('modal-hide');
    }
  };

  const getProjects = async () => {
    try {
      const res = await axios.get(`http://localhost:8080/projekty`);
      setProjects(res.data);
      setData(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProjects();
  }, []);

  useEffect(() => {
    console.log('odpalam');
    console.log('Search', search);
    const result = projects.filter(
      ({ nazwa }) => nazwa !== null && nazwa.includes(search)
    );
    console.log('Result', result);
    if (search === '') {
      setData(projects);
    } else {
      setData(result);
    }
  }, [search]);

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
        <span className="search-container">
          <label htmlFor="search">
            <BiSearchAlt className="search-icon" />
          </label>
          <input
            type="text"
            name="search"
            id="search"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </span>
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
            <Link
              to={`project/${id}`}
              className="project-item table-grid"
              key={id}
            >
              <p>{nazwa}</p>
              <p>
                {}
                {opis !== null
                  ? opis.length > 40
                    ? `${opis.substring(0, 40)}...`
                    : `${opis}`
                  : ''}
              </p>
              <span>
                <p className={`status ${status ? 'in-progress' : 'finished'}`}>
                  {status ? 'finished' : 'in progress'}
                </p>
              </span>
              <p>{dataczas_utworzenia}</p>
              <p>{dataczas_utworzenia}</p>
              <button>
                <p className="status">
                  <HiOutlineDotsCircleHorizontal />
                </p>
              </button>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default Projects;
