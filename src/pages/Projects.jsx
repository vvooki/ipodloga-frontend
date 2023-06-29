import { useState, useEffect, useContext } from 'react';
import { MdOutlineAddBox } from 'react-icons/md';
import { HiOutlineDotsCircleHorizontal } from 'react-icons/hi';
import { BiSearchAlt } from 'react-icons/bi';
import './css/projects.css';
import AddProject from '../components/AddProject';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { auth } from '../firebase';
import { AuthContext } from '../context/AuthContext';
import { toast } from 'react-hot-toast';
const Projects = () => {
  const { currentUser } = useContext(AuthContext);
  const [projects, setProjects] = useState([]);
  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState({});
  const [pages, setPages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
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
    if (currentUser.isAdmin) {
      if (show === 'modal-hide') {
        setShow('modal-show');
      } else {
        setShow('modal-hide');
        setEditData(defaultEditData);
      }
    } else {
      toast.error('You need admin permissions to open this window');
    }
  };

  const getProjects = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8080/projekty?strona=${currentPage}&iloscNaStrone=3`
      );
      setProjects(res.data.data);
      setData(res.data.data);
      let arr = [];
      if (res.data.totalPage < 2) {
        arr.push(1);
      } else {
        for (let i = 0; i < res.data.totalPage; i++) {
          arr.push(i + 1);
        }
      }
      setPagination({
        currentPage: res.data.currentPage,
        totalPage: res.data.totalPage,
      });
      setPages(arr);
    } catch (error) {
      console.log(error);
    }
  };

  // useEffect(() => {
  //   getProjects();
  // }, []);

  useEffect(() => {
    getProjects();
  }, [currentPage]);

  useEffect(() => {
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
      <footer>
        {pages.map((p) => {
          return (
            <button
              className={`${currentPage === p && 'current-page'}`}
              onClick={() => setCurrentPage(p)}
            >
              {p}
            </button>
          );
        })}
      </footer>
    </section>
  );
};

export default Projects;
