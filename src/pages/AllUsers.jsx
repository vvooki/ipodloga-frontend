import { useState, useEffect, useContext } from 'react';
// import '../components/css/modal.css';
import './css/allusers.css';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { MdOutlineAddBox } from 'react-icons/md';
import axios from 'axios';
import toast from 'react-hot-toast';
import { AuthContext } from '../context/AuthContext';
const AllUsers = () => {
  const { currentUser } = useContext(AuthContext);
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [index, setIndex] = useState('');
  const [admin, setAdmin] = useState(false);
  const [fetchedUsers, setFetchedUsers] = useState([]);
  const [user, setUser] = useState([]);

  const getUsers = async () => {
    try {
      const res = await axios.get(`http://localhost:8080/student`);
      setFetchedUsers(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (currentUser.isAdmin) getUsers();
    else {
      setUser(currentUser);
      setName(currentUser.imie);
      setSurname(currentUser.nazwisko);
      setIndex(currentUser.nr_indeksu);
    }
  }, []);

  const handleSetInputs = (user) => {
    setUser(user);
    setName(user.imie);
    setSurname(user.nazwisko);
    setIndex(user.nr_indeksu);
    setAdmin(user.isAdmin);
  };

  const handleUpdateUser = async (e) => {
    e.preventDefault();
    const data = user;
    data.imie = name;
    data.nazwisko = surname;
    data.nr_indeksu = index;
    data.isAdmin = admin;
    try {
      const res = await axios.put(
        `http://localhost:8080/student/${user.id}`,
        data
      );
      toast.success('Success! User has been updated');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="all-users-section">
      {currentUser.isAdmin && (
        <div className="user-list">
          <div className="user-table-header">
            <p>ID</p>
            <p>NAME</p>
            <p>SURNAME</p>
            <p>EMAIL</p>
          </div>

          {fetchedUsers.map((user) => {
            return (
              <div
                className="user-row"
                key={user.id}
                onClick={() => handleSetInputs(user)}
              >
                <p>{user.id.substring(0, 10)}...</p>
                <p>{user.imie}</p>
                <p>{user.nazwisko}</p>
                <p>{user.email}</p>
              </div>
            );
          })}
        </div>
      )}

      <div className="edit-user-container">
        <h2>Edit User</h2>
        <form>
          <div>
            <span>
              <label htmlFor="name">Name</label>
              <input
                type="text"
                name="name"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="name"
              />
            </span>
            <span>
              <label htmlFor="surname">Surname</label>
              <input
                type="text"
                name="surname"
                id="surname"
                value={surname}
                onChange={(e) => setSurname(e.target.value)}
                placeholder="surname"
              />
            </span>
            <span>
              <label htmlFor="index">Index Number</label>
              <input
                type="text"
                name="index"
                id="index"
                value={index}
                onChange={(e) => setIndex(e.target.value)}
                placeholder="index number"
              />
            </span>
            {currentUser.isAdmin && (
              <span>
                <label htmlFor="admin">Admin privileges</label>
                <select
                  name="admin"
                  id="admin"
                  value={admin}
                  onChange={(e) => setAdmin(e.target.value)}
                >
                  <option value={false}>false</option>
                  <option value={true}>true</option>
                </select>
              </span>
            )}
          </div>
          <button onClick={handleUpdateUser}>
            {currentUser.isAdmin ? 'Update user' : 'Update your profile'}
          </button>
        </form>
      </div>
    </section>
  );
};

export default AllUsers;
