import { useContext, useEffect, useState } from 'react';
import './css/modal.css';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useAppDispatch, useAppSelector } from '../hooks/useRedux';
import {
  addTask,
  deleteTask,
  getProjectTasks,
  removeStudentFromTask,
  removeTaskFromProject,
  updateTask,
} from '../redux/thunks/taskThunk';
import { AuthContext } from '../context/AuthContext';

const AddTask = ({ show, close, projectId, isEdit }) => {
  const [name, setName] = useState('');
  const [type, setType] = useState('TASK');
  const [deadline, setDeadline] = useState(new Date().toISOString());
  const [status, setStatus] = useState('TO-DO');
  const [priority, setPriority] = useState('HIGH');
  const [description, setDescription] = useState('');

  const { currentUser } = useContext(AuthContext);

  const task = useAppSelector((state) => state.task.task);

  const dispatch = useAppDispatch();

  const handleAddTask = async (e) => {
    e.preventDefault();
    const data = {
      id: task ? task.id : null,
      name,
      description,
      sequence: 1,
      task_status: status,
      task_priority: priority,
      task_type: type,
      project_id: projectId,
      student_id: task ? task.student_id : 0,
      deadline: deadline,
    };
    if (isEdit) {
      try {
        dispatch(updateTask({ task: data, token: currentUser.accessToken }));
        toast.success('Success! Task has been updated');
        close();
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        dispatch(addTask({ task: data, token: currentUser.accessToken }));
        toast.success('Success! New task has been created');
        close();
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleDeleteTask = async () => {
    if (!task || !currentUser) return;
    dispatch(deleteTask({ id: task.id, token: currentUser.accessToken }));
    toast('Task has been removed', {
      icon: '🗑️',
    });
    close();
  };

  const clearInputs = () => {
    setName('');
    setType('TASK');
    setPriority('HIGH');
    setStatus('TO-DO');
    setDeadline(new Date().toISOString());
    setDescription('');
  };

  useEffect(() => {
    if (isEdit) {
      setName(task.name);
      setType(task.task_type);
      setPriority(task.task_priority);
      setStatus(task.task_status);
      setDeadline(task.deadline);
      setDescription(task.description);
    }
  }, [task]);

  useEffect(() => {
    if (show) {
      clearInputs();
    }
  }, [show]);

  if (show)
    return (
      <section className={`project-form-section flex`}>
        <div className="project-form-container">
          <div className="top-container">
            <span>
              <h2>
                {isEdit ? 'EDITING TASK - ' + task.name : 'CREATE NEW TASK'}
              </h2>
              {isEdit && (
                <button className="delete-btn" onClick={handleDeleteTask}>
                  DELETE TASK
                </button>
              )}
            </span>
            <button className="close-modal-btn" onClick={() => close(1)}>
              <AiOutlineCloseCircle />
            </button>
          </div>

          <form className="form" onSubmit={handleAddTask}>
            <span>
              <label htmlFor="name">Task Name</label>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Task name"
                value={name}
                required
                onChange={(e) => setName(e.target.value)}
              />
            </span>
            <div>
              <span>
                <label htmlFor="type">type</label>
                <select
                  name="type"
                  id="type"
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                >
                  <option value="TASK">TASK</option>
                  <option value="ERROR">ERROR</option>
                </select>
              </span>
              <span>
                <label htmlFor="deadline">Deadline</label>
                <input
                  type="date"
                  name="deadline"
                  id="deadline"
                  value={deadline}
                  required
                  onChange={(e) => setDeadline(e.target.value)}
                />
              </span>
            </div>
            <div>
              <span>
                <label htmlFor="status">STATUS</label>
                <select
                  name="status"
                  id="status"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value="TO-DO">TO-DO</option>
                  <option value="IN-PROGRESS">IN-PROGRESS</option>
                  <option value="DONE">DONE</option>
                </select>
              </span>
              <span>
                <label htmlFor="priority">priority</label>
                <select
                  name="priority"
                  id="priority"
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                >
                  <option value="HIGH">HIGH</option>
                  <option value="LOW">LOW</option>
                </select>
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
              {isEdit ? 'UPDATE TASK' : 'CREATE NEW TASK'}
            </button>
          </form>
        </div>
      </section>
    );
};

export default AddTask;
