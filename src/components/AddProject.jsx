import { useContext, useEffect, useState } from 'react';
import './css/modal.css';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useAppDispatch, useAppSelector } from '../hooks/useRedux';
import { addProject, updateProject } from '../redux/thunks/projectThunk';
import { AuthContext } from '../context/AuthContext';
const AddProject = ({ visible, close, isEdit }) => {
  const { currentUser } = useContext(AuthContext);

  const [name, setName] = useState('');
  const [status, setStatus] = useState('in-progress');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [description, setDescription] = useState('');

  const project = useAppSelector((state) => state.project.project);
  const dispatch = useAppDispatch();

  const handleAddProject = async (e) => {
    e.preventDefault();
    const data = {
      name,
      description,
      status,
      creationDateTime: startDate,
      completionDateTime: endDate,
    };
    if (isEdit) {
      dispatch(
        updateProject({
          id: project.id,
          project: data,
          token: currentUser.accessToken,
        }),
      );
      toast.success('Success! Project has been updated');
      close();
    } else {
      dispatch(addProject({ project: data, token: currentUser.accessToken }));
      toast.success('Success! New project has been created');
      close();
    }
  };

  const handleDeleteProject = async () => {
    try {
      const res = await axios.delete(
        `http://localhost:8080/projekty/${project.id}`,
      );
      toast('Project has been removed', {
        icon: '🗑️',
      });
      close();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (isEdit) {
      setName(project.name);
      setStatus(project.status);
      // setStartDate(project.creationDateTime);
      // setEndDate(project.completionDateTime);
      setDescription(project.description);
    }
  }, [isEdit]);

  return (
    <section className={`project-form-section flex`}>
      <div className="project-form-container">
        <div className="top-container">
          <span>
            <h2>
              {isEdit
                ? 'EDITING PROJECT - ' + project.name
                : 'CREATE NEW PROJECT'}
            </h2>
            {isEdit && (
              <button className="delete-btn" onClick={handleDeleteProject}>
                DELETE PROJECT
              </button>
            )}
          </span>
          <button className="close-modal-btn" onClick={close}>
            <AiOutlineCloseCircle />
          </button>
        </div>
        <form className="form" onSubmit={handleAddProject}>
          <span>
            <label htmlFor="name">Project Name</label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Project name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </span>
          <span>
            <label htmlFor="status">status</label>
            <select
              name="status"
              id="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="in-progress">in-progress</option>
              <option value="finished">finished</option>
              <option value="awaiting">awaiting</option>
            </select>
          </span>
          <div>
            <span>
              <label htmlFor="start_date">start date</label>
              <input
                type="date"
                name="start_date"
                id="start_date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </span>
            <span>
              <label htmlFor="end_date">end date</label>
              <input
                type="date"
                name="end_date"
                id="end_date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </span>
          </div>
          <span>
            <label htmlFor="description">description</label>
            <textarea
              name="description"
              id="description"
              cols="30"
              rows="10"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </span>
          <button type="submit">
            {isEdit ? 'UPDATE PROJECT' : 'CREATE NEW PROJECT'}
          </button>
        </form>
      </div>
    </section>
  );
};

export default AddProject;
