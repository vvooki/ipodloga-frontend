import { useContext, useEffect } from 'react';
import './css/sidebar.css';
import avatar from '../images/avatar.svg';
import { BiLogOut } from 'react-icons/bi';
import { MdOutlineBookmarks, MdTaskAlt, MdOutlineChat } from 'react-icons/md';
import { auth } from '../firebase';
import { AuthContext } from '../context/AuthContext';
import { Link, useLocation } from 'react-router-dom';
const Sidebar = () => {
  const location = useLocation();
  const loc = location.pathname.split('/')[1];

  console.log(loc);
  const { dispatch, currentUser } = useContext(AuthContext);
  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        dispatch({ type: 'LOGOUT' });
      })
      .catch((error) => alert(error.message));
  };

  const isActive = (n) => {
    if (n === 1) {
      if (loc === 'projects' || loc === '') return true;
    } else if (n === 2) {
      if (loc === 'tasks') return true;
    } else if (n === 3) {
      if (loc === 'chat') return true;
    } else return false;
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
        <Link to="/" className={`${isActive(1) && 'active'}`}>
          <li>
            <MdOutlineBookmarks /> Projects
          </li>
        </Link>
        <Link to="tasks" className={`${isActive(2) && 'active'}`}>
          <li>
            <MdTaskAlt /> Tasks
          </li>
        </Link>
        <Link to="chat" className={`${isActive(3) && 'active'}`}>
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
