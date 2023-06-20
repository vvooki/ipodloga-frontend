import { useEffect, useState } from 'react';
import './css/modal.css';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { MdOutlineAddBox } from 'react-icons/md';
import axios from 'axios';
import toast from 'react-hot-toast';
const AddMember = ({ show, close, projectId }) => {
  const [name, setName] = useState('');
  const [fetchedUsers, setFetchedUsers] = useState([]);
  const [userList, setUserList] = useState([]);

  console.log(name);

  const handleAddUsersToProject = async () => {
    try {
      for (let i = 0; i < userList.length; i++) {
        const res = await axios.post(
          `http://localhost:8080/student/${userList[i].id}/projekty/${projectId}`
        );
      }
      toast.success('Success! Users has been added');
      setUserList([]);
      close(2);
    } catch (error) {
      console.log(error);
    }
  };

  const getUsers = async () => {
    try {
      const res = await axios.get(`http://localhost:8080/student`);
      setFetchedUsers(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const addToList = (user) => {
    if (userList.includes(user)) {
      toast.error('User already added');
    } else {
      const arr = [...userList, user];
      setUserList(arr);
    }
  };

  const removeUserFromList = (user) => {
    const arr = userList.filter((u) => u !== user);
    setUserList(arr);
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <section className={`project-form-section ${show}`}>
      <div className="project-form-container">
        <div className="top-container">
          <h2>ADD USER TO PROJECT</h2>
          <button onClick={() => close(2)}>
            <AiOutlineCloseCircle />
          </button>
        </div>
        <div className="form">
          {userList.length > 0 ? (
            <datalist className="users-to-add-container">
              <p>List of users to add to the project:</p>
              <div className="users-to-add-list">
                {userList.map((user) => {
                  return (
                    <span
                      key={user.id}
                      onClick={() => removeUserFromList(user)}
                    >
                      {user.imie} {user.nazwisko}
                    </span>
                  );
                })}
                <button
                  className="add-users-btn"
                  onClick={handleAddUsersToProject}
                >
                  add above users to the project
                </button>
              </div>
            </datalist>
          ) : (
            ''
          )}
          <span>
            <label htmlFor="name">Find user</label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Username..."
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </span>

          <table className="user-list">
            <div className="user-table-header">
              <p>ID</p>
              <p>NAME</p>
              <p>SURNAME</p>
              <p>EMAIL</p>
              <p>ADD USER</p>
            </div>

            {fetchedUsers.map((user) => {
              return (
                <div className="user-row" key={user.id}>
                  <p>{user.id.substring(0, 4)}...</p>
                  <p>{user.imie}</p>
                  <p>{user.nazwisko}</p>
                  <p>{user.email}</p>
                  <button onClick={() => addToList(user)}>
                    <MdOutlineAddBox className="add-user-btn" />
                  </button>
                </div>
              );
            })}
          </table>
        </div>
      </div>
    </section>
  );
};

export default AddMember;
