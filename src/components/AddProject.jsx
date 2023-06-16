import { useEffect, useState } from 'react';
import './css/addproject.css';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import axios from 'axios';
import toast from 'react-hot-toast';
const AddProject = ({ show, close, getProjects }) => {
  const [name, setName] = useState('');
  const [status, setStatus] = useState('in-progress');
  const [startDate, setStartDate] = useState('14/06/2023');
  const [endDate, setEndDate] = useState('');
  const [description, setDescription] = useState('');

  console.log(name, status, startDate, endDate, description);

  const handleAddProject = async (e) => {
    e.preventDefault();
    const d1 = startDate.split('-', 3);
    const d2 = endDate.split('-', 3);
    const data = {
      id: '1',
      nazwa: name,
      opis: description,
      status: status,
      dataczas_utworzenia: d1[2] + '.' + d1[1] + '.' + d1[0],
      dataczas_ukonczenia: d2[2] + '.' + d2[1] + '.' + d2[0],
    };
    try {
      const res = await axios.post(`http://localhost:8080/projekty`, data);
      toast.success('Success! New project has been created');
      close();
      getProjects();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const d = startDate.split('-', 3);
    console.log(d[2] + '.' + d[1] + '.' + d[0]);
  }, [startDate]);

  return (
    <section className={`project-form-section ${show}`}>
      <div className="project-form-container">
        <div className="top-container">
          <h2>CREATE NEW PROJECT</h2>
          <button onClick={close}>
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
          <button type="submit">CREATE NEW PROJECT</button>
        </form>
      </div>
    </section>
  );
};

export default AddProject;
