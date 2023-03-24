import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';

const Home = () => {
  return (
    <section className="dashboard">
      <Sidebar />
      <section className="content">
        <Navbar />
        <main>
          <Outlet />
        </main>
      </section>
    </section>
  );
};

export default Home;
