import { MdOutlineAddBox } from 'react-icons/md';
import './css/tasks.css';
const Tasks = () => {
  return (
    <section className="tasks-section">
      <div className="top-container">
        <h2>Name of the project</h2>
      </div>
      <div className="tasks-container container">
        <div className="top-container">
          <h3>Tasks</h3>
          <button>
            CREATE NEW TASK <MdOutlineAddBox className="add-icon" />
          </button>
        </div>
        <div className="table-header table-grid">
          <p>name</p>
          <p>type</p>
          <p>Priority</p>
          <p>description</p>
          <p>deadline</p>
          <p>status</p>
          <p>options</p>
        </div>
      </div>
      <div className="members-container container">
        <div className="top-container">
          <h3>Members</h3>
          <button>
            <MdOutlineAddBox className="add-icon" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Tasks;
