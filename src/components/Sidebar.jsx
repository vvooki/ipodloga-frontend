import React, { useContext } from 'react';
import './css/sidebar.css';
import avatar from '../images/avatar.svg';
import { BiLogOut } from 'react-icons/bi';
import { MdOutlineBookmarks, MdTaskAlt, MdOutlineChat } from 'react-icons/md';
import { auth } from '../firebase';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';
const Sidebar = () => {
  const { dispatch, currentUser } = useContext(AuthContext);
  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        dispatch({ type: 'LOGOUT' });
      })
      .catch((error) => alert(error.message));
  };

  return (
    <section className="sidebar-section">
      <div className="avatar">
        <img src={avatar} alt="avatar" />
        <div>
          <h2>{currentUser.imie}</h2>
          <p>project manager</p>
        </div>
      </div>

      <ul className="sidebarList">
        <Link to="/" href="" className="active">
          <li>
            <MdOutlineBookmarks /> Projects
          </li>
        </Link>
        <Link to="tasks">
          <li>
            <MdTaskAlt /> Tasks
          </li>
        </Link>
        <Link to="/" href="">
          <li>
            <MdOutlineChat /> Chat
          </li>
        </Link>
      </ul>

      <button className="logout-btn" onClick={handleSignOut}>
        <BiLogOut className="logout-icon" /> Logout
      </button>
    </section>
  );
};

export default Sidebar;
