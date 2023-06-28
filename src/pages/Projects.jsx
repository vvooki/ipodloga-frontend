import { useState, useEffect } from 'react';
import { MdOutlineAddBox } from 'react-icons/md';
import { HiOutlineDotsCircleHorizontal } from 'react-icons/hi';
import { BiSearchAlt } from 'react-icons/bi';
import './css/projects.css';
import AddProject from '../components/AddProject';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { auth } from '../firebase';
const Projects = () => {
  console.log();
  const [projects, setProjects] = useState([]);
  const [data, setData] = useState([]);
  const [show, setShow] = useState('modal-hide');
  const [search, setSearch] = useState('');
  const defaultEditData = {
    isEdit: false,
    nazwa: '',
    dataczas_utworzenia: '',
    dataczas_ukonczenia: '',
    status: '',
    opis: '',
  };
  const [editData, setEditData] = useState(defaultEditData);

  const handleModal = () => {
    if (show === 'modal-hide') {
      setShow('modal-show');
    } else {
      setShow('modal-hide');
      setEditData(defaultEditData);
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

  useEffect(() => {
    if (show === 'modal-show') {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [show]);

  return (
    <section className="projects-section">
      <AddProject
        show={show}
        close={handleModal}
        getProjects={getProjects}
        editData={editData}
      />
      <div className="top-container">
        <h2>Your current projects</h2>
        <button onClick={handleModal}>
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
          const {
            id,
            nazwa,
            opis,
            dataczas_utworzenia,
            dataczas_ukonczenia,
            status,
          } = project;
          return (
            <div className="project-item table-grid" key={id}>
              <Link to={`project/${id}`}>{nazwa}</Link>
              <Link to={`project/${id}`}>
                {opis !== null
                  ? opis.length > 40
                    ? `${opis.substring(0, 40)}...`
                    : `${opis}`
                  : ''}
              </Link>
              <Link to={`project/${id}`}>
                <p className={`status ${status}`}>{status}</p>
              </Link>
              <Link to={`project/${id}`}>{dataczas_utworzenia}</Link>
              <Link to={`project/${id}`}>{dataczas_ukonczenia}</Link>
              <button
                onClick={() => {
                  handleModal();
                  setEditData({ isEdit: true, ...project });
                }}
              >
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
