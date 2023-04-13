import './css/addproject.css';
import { AiOutlineCloseCircle } from 'react-icons/ai';
const AddProject = ({ show, close }) => {
  return (
    <section className={`project-form-section ${show}`}>
      <div className="project-form-container">
        <div className="top-container">
          <h2>CREATE NEW PROJECT</h2>
          <button onClick={close}>
            <AiOutlineCloseCircle />
          </button>
        </div>
        <form className="form" action="">
          <span>
            <label htmlFor="name">Project Name</label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Project name"
            />
          </span>
          <span>
            <label htmlFor="status">status</label>
            <select name="" id="">
              <option value="in-progress">in-progress</option>
              <option value="in-progress">finished</option>
              <option value="in-progress">awaiting</option>
            </select>
          </span>
          <div>
            <span>
              <label htmlFor="start_date">start date</label>
              <input type="date" name="start_date" id="start_date" />
            </span>
            <span>
              <label htmlFor="end_date">end date</label>
              <input type="date" name="end_date" id="end_date" />
            </span>
          </div>
          <span>
            <label htmlFor="description">description</label>
            <textarea
              name="description"
              id="description"
              cols="30"
              rows="10"
            ></textarea>
          </span>
          <button type="submit">CREATE NEW PROJECT</button>
        </form>
      </div>
    </section>
  );
};

export default AddProject;
