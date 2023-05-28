import React, { useContext } from 'react';
import './css/sidebar.css';
import avatar from '../images/avatar.svg';
import { BiLogOut } from 'react-icons/bi';
import { MdOutlineBookmarks, MdTaskAlt, MdOutlineChat } from 'react-icons/md';
import { auth } from '../firebase';
import { AuthContext } from '../context/AuthContext';
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
          <h2>{currentUser.email}</h2>
          <p>project manager</p>
        </div>
      </div>

      <ul className="sidebarList">
        <a href="" className="active">
          <li>
            <MdOutlineBookmarks /> Projects
          </li>
        </a>
        <a href="">
          <li>
            <MdTaskAlt /> Tasks
          </li>
        </a>
        <a href="">
          <li>
            <MdOutlineChat /> Chat
          </li>
        </a>
      </ul>

      <button className="logout-btn" onClick={handleSignOut}>
        <BiLogOut className="logout-icon" /> Logout
      </button>
    </section>
  );
};

export default Sidebar;
