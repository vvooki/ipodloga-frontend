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
import { useAppDispatch, useAppSelector } from '../hooks/useRedux';
import {
  getProjects,
  getProjectsForStudent,
} from '../redux/thunks/projectThunk';
import { setProject } from '../redux/features/projectSlice';
import { format } from 'date-fns';
const Projects = () => {
  const { currentUser } = useContext(AuthContext);
  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState({});
  const [pages, setPages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [show, setShow] = useState('modal-hide');
  const [search, setSearch] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);

  const [isEdit, setIsEdit] = useState(false);

  const dispatch = useAppDispatch();

  const projects = useAppSelector((state) => state.project.projects);
  console.log(projects);

  useEffect(() => {
    if (currentUser.isAdmin) {
      dispatch(
        getProjects({
          page: currentPage,
          limit: 10,
          token: currentUser.accessToken,
        }),
      );
    } else {
      dispatch(
        getProjectsForStudent({
          id: currentUser.id,
          page: currentPage,
          limit: 10,
          token: currentUser.accessToken,
        }),
      );
    }
  }, [
    currentPage,
    currentUser.accessToken,
    currentUser.id,
    currentUser.isAdmin,
    dispatch,
    pages,
  ]);

  useEffect(() => {
    if (show === 'modal-show') {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [show]);

  const handleEditProject = (project) => {
    if (!currentUser.isAdmin) {
      toast.error('You need admin permissions to open this window');
      return;
    }
    setIsEdit(true);
    setIsModalVisible(true);
    dispatch(setProject(project));
  };

  const handleCreateProject = () => {
    setIsEdit(false);
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  if (projects)
    return (
      <section className="projects-section">
        {isModalVisible && (
          <AddProject
            visible={isModalVisible}
            isEdit={isEdit}
            close={handleCloseModal}
          />
        )}
        <div className="top-container">
          <h2>Your current projects</h2>
          <button onClick={handleCreateProject}>
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
          {projects.map((project) => {
            const {
              id,
              name,
              description,
              status,
              creationDateTime,
              completionDateTime,
            } = project;
            return (
              <div
                className="project-item table-grid"
                key={id}
                onClick={() => dispatch(setProject(project))}
              >
                <Link to={`project/${id}`}>{name}</Link>
                <Link to={`project/${id}`}>
                  {description !== null
                    ? description.length > 40
                      ? `${description.substring(0, 40)}...`
                      : `${description}`
                    : ''}
                </Link>
                <Link to={`project/${id}`}>
                  <p className={`status ${status}`}>{status}</p>
                </Link>
                <Link to={`project/${id}`}>
                  {format(creationDateTime, 'dd.MM.yyyy')}
                </Link>
                <Link to={`project/${id}`}>
                  {format(completionDateTime, 'dd.MM.yyyy')}
                </Link>
                <button onClick={() => handleEditProject(project)}>
                  <p className="status flex justify-center">
                    <HiOutlineDotsCircleHorizontal />
                  </p>
                </button>
              </div>
            );
          })}
        </div>
        {currentUser.isAdmin && (
          <footer>
            {pages.map((p) => {
              return (
                <button
                  key={p}
                  className={`${currentPage === p && 'current-page'}`}
                  onClick={() => setCurrentPage(p)}
                >
                  {p}
                </button>
              );
            })}
          </footer>
        )}
      </section>
    );
};

export default Projects;
