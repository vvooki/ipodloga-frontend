import { useContext, useEffect, useState } from 'react';
import './css/modal.css';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { MdOutlineAddBox } from 'react-icons/md';
import axios from 'axios';
import toast from 'react-hot-toast';
import { AuthContext } from '../context/AuthContext';
import { useAppDispatch } from '../hooks/useRedux';
import { getProjectMembers } from '../redux/thunks/projectThunk';
const AddMember = ({ show, close, projectId, members }) => {
  const { currentUser } = useContext(AuthContext);
  const dispatch = useAppDispatch();

  const [name, setName] = useState('');
  const [fetchedUsers, setFetchedUsers] = useState([]);
  const [userList, setUserList] = useState([]);

  console.log(name);

  const handleAddUsersToProject = async () => {
    try {
      for (let i = 0; i < userList.length; i++) {
        const res = await axios.post(
          `http://localhost:8080/api/student-projects/add`,
          { studentId: userList[i].id, projectId },
          {
            headers: {
              authorization: `Bearer ${currentUser.accessToken}`,
            },
          }
        );
      }
      toast.success('Success! Users has been added');
      setUserList([]);
      dispatch(
        getProjectMembers({ projectId, token: currentUser.accessToken })
      );
      close();
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

  const getUsers = async () => {
    try {
      const res = await axios.get(`http://localhost:8080/api/students`, {
        headers: {
          authorization: `Bearer ${currentUser.accessToken}`,
        },
      });
      console.log(res.data, members);
      const membersIds = members.map((obj) => obj.id);
      const newUsers = res.data.filter((obj) => !membersIds.includes(obj.id));
      setFetchedUsers(newUsers);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  if (show)
    return (
      <section className={`project-form-section grid`}>
        <div className="project-form-container">
          <div className="top-container">
            <h2>ADD USER TO PROJECT</h2>
            <button className="close-modal-btn" onClick={() => close(2)}>
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
                        {user.firstName} {user.lastName}
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

            <section className="user-list">
              <div className="user-table-header">
                <p>ID</p>
                <p>NAME</p>
                <p>SURNAME</p>
                <p>EMAIL</p>
                <p>ADD USER</p>
              </div>

              {fetchedUsers.map((user) => {
                return (
                  <div
                    className="user-row"
                    key={user.id}
                    onClick={() => addToList(user)}
                  >
                    <p className="flex items-center">{user.id}</p>
                    <p className="flex items-center">{user.firstName}</p>
                    <p className="flex items-center">{user.lastName}</p>
                    <p className="flex items-center">{user.email}</p>
                    <button className="flex justify-center items-center mx-auto">
                      <MdOutlineAddBox className="add-user-btn" />
                    </button>
                  </div>
                );
              })}
            </section>
          </div>
        </div>
      </section>
    );
};

export default AddMember;
