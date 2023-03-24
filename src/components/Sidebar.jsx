import React from 'react';
import './css/sidebar.css';
import avatar from '../images/avatar.svg';
import { BiLogOut } from 'react-icons/bi';
import { MdOutlineBookmarks, MdTaskAlt, MdOutlineChat } from 'react-icons/md';
const Sidebar = () => {
  return (
    <section className="sidebar-section">
      <div className="avatar">
        <img src={avatar} alt="avatar" />
        <div>
          <h2>JOHN</h2>
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

      <button className="logout-btn">
        {' '}
        <BiLogOut className="logout-icon" /> Logout
      </button>
    </section>
  );
};

export default Sidebar;
