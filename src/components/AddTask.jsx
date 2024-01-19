import { useContext, useEffect, useState } from 'react';
import './css/modal.css';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useAppDispatch, useAppSelector } from '../hooks/useRedux';
import {
  deleteTask,
  removeStudentFromTask,
  removeTaskFromProject,
} from '../redux/thunks/taskThunk';
import { AuthContext } from '../context/AuthContext';

const AddTask = ({ show, close, projectId, isEdit }) => {
  const [name, setName] = useState();
  const [type, setType] = useState('TASK');
  const [deadline, setDeadline] = useState('');
  const [status, setStatus] = useState('ON_GOING');
  const [priority, setPriority] = useState('HIGH');
  const [description, setDescription] = useState('');

  const { currentUser } = useContext(AuthContext);

  const task = useAppSelector((state) => state.task.task);

  const dispatch = useAppDispatch();

  const handleAddTask = async (e) => {
    e.preventDefault();
    const d1 = deadline.split('-', 3);
    const data = {
      id: '1',
      nazwa: name,
      opis: description,
      status: status,
      priority: priority,
      type: type,
      projektId: projectId,
      deadline: d1[2] + '.' + d1[1] + '.' + d1[0],
    };
    if (isEdit) {
      try {
        const res = await axios.put(
          `http://localhost:8080/zadania/zadanie/${task.id}`,
          data,
        );
        toast.success('Success! Task has been updated');
        close();
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        const res = await axios.post(`http://localhost:8080/zadania`, data);
        toast.success('Success! New task has been created');
        close();
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleDeleteTask = async () => {
    if (!task || !currentUser) return;
    // dispatch(removeStudentFromTask({ taskId:task.id, studentId: current token: currentUser.accessToken }));
    dispatch(
      removeTaskFromProject({
        taskId: task.id,
        projectId: projectId,
        token: currentUser.accessToken,
      }),
    );
    // dispatch(deleteTask({ id: task.id, token: currentUser.accessToken }));
    toast('Task has been removed', {
      icon: '🗑️',
    });
    close();
  };

  useEffect(() => {
    if (isEdit) {
      setName(task.name);
      setType(task.task_type);
      setPriority(task.task_priority);
      setStatus(task.task_status);
      setDeadline(task.deadline);
      setDescription(task.description);
    } else {
      setName('');
      setType('TASK');
      setPriority('HIGH');
      setStatus('ON_GOING');
      setDeadline('');
      setDescription('');
    }
  }, [task]);

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
