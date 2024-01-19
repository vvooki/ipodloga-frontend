import { useContext, useEffect } from 'react';
import './css/sidebar.css';
import avatar from '../images/avatar.svg';
import { BiLogOut } from 'react-icons/bi';
import {
  MdOutlineBookmarks,
  MdTaskAlt,
  MdOutlineChat,
  MdTagFaces,
  MdCalendarViewWeek,
} from 'react-icons/md';
import { auth } from '../firebase';
import { AuthContext } from '../context/AuthContext';
import { Link, NavLink, useLocation } from 'react-router-dom';
const Sidebar = () => {
  const location = useLocation();
  const loc = location.pathname.split('/')[1];

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
          <h2>{currentUser.firstName}</h2>
          <p>{currentUser.isAdmin ? 'Project manager' : 'Developer'}</p>
        </div>
      </div>

      <ul className="sidebarList">
        <NavLink to="/" className={({ isActive }) => isActive && 'active'}>
          <li>
            <MdOutlineBookmarks /> Projects
          </li>
        </NavLink>
        <NavLink to="tasks" className={({ isActive }) => isActive && 'active'}>
          <li>
            <MdTaskAlt /> Tasks
          </li>
        </NavLink>
        <NavLink to="board" className={({ isActive }) => isActive && 'active'}>
          <li>
            <MdCalendarViewWeek /> Kanban
          </li>
        </NavLink>
        <NavLink to="chat" className={({ isActive }) => isActive && 'active'}>
          <li>
            <MdOutlineChat /> Chat
          </li>
        </NavLink>

        <Link to="users" className={({ isActive }) => isActive && 'active'}>
          <li>
            <MdTagFaces /> {currentUser.isAdmin ? 'Users' : 'Edit profile'}
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
