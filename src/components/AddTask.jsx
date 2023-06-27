import { useEffect, useState } from 'react';
import './css/modal.css';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import axios from 'axios';
import toast from 'react-hot-toast';
const AddTask = ({ show, close, getTasks, projectId, editData }) => {
  const [name, setName] = useState();
  const [type, setType] = useState('TASK');
  const [deadline, setDeadline] = useState('');
  const [status, setStatus] = useState('ON_GOING');
  const [priority, setPriority] = useState('HIGH');
  const [description, setDescription] = useState('');

  console.log(editData, name, status, type, priority, deadline, description);

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
    if (editData.isEdit) {
      console.log('wchodze do edycji', editData.id);
      try {
        const res = await axios.put(
          `http://localhost:8080/zadania/zadanie/${editData.id}`,
          data
        );
        toast.success('Success! Task has been updated');
        close(1);
        getTasks();
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        const res = await axios.post(`http://localhost:8080/zadania`, data);
        toast.success('Success! New task has been created');
        close(1);
        getTasks();
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    if (editData.isEdit) {
      setName(editData.nazwa);
      setType(editData.type);
      setPriority(editData.priority);
      setStatus(editData.status);
      if (editData.deadline !== '') {
        if (editData.deadline.includes('-')) {
          setDeadline(editData.deadline);
        } else {
          const d = editData.deadline.split('.', 3);
          setDeadline(d[2] + '-' + d[1] + '-' + d[0]);
        }
      }
      setDescription(editData.opis);
    } else {
      setName('');
      setType('TASK');
      setPriority('HIGH');
      setStatus('ON_GOING');
      setDeadline('');
      setDescription('');
    }
  }, [editData]);

  return (
    <section className={`project-form-section ${show}`}>
      <div className="project-form-container">
        <div className="top-container">
          <h2>
            {editData.isEdit
              ? 'EDITING "' + editData.nazwa + '" TASK'
              : 'CREATE NEW TASK'}
          </h2>
          <button onClick={() => close(1)}>
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
                <option value="DONE">DONE</option>
                <option value="ON_GOING">ON GOING</option>
                <option value="NOT_ASSIGNED">NOT ASSIGNED</option>
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
            {editData.isEdit ? 'UPDATE TASK' : 'CREATE NEW TASK'}
          </button>
        </form>
      </div>
    </section>
  );
};

export default AddTask;
