import { useContext, useState, useEffect } from 'react';
import illustration from './../images/login-illustration.svg';
import './css/Login.css';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import toast, { Toaster } from 'react-hot-toast';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const { dispatch } = useContext(AuthContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userCredentials = {
        email,
        password,
      };

      const user = await axios.post(
        'http://localhost:8080/api/auth/login',
        userCredentials,
      );
      dispatch({ type: 'LOGIN', payload: user.data });
      console.log('Logged as', user.email);
      navigate('/');
    } catch (error) {
      console.log(error);
      toast.error('Wrong email or password');
    }
  };

  return (
    <section className="flex items-center justify-center h-screen">
      <div className="flex-1 hidden lg:grid bg-slate-100 h-full justify-center items-center">
        <img
          src={illustration}
          alt="login illustration"
          className="w-[65%] h-auto mx-auto"
        />
      </div>
      <div className="login-container flex-1">
        <div className="login-text">
          <h2>Sign in to iPodloga</h2>
          <p>Start managing your projects with ease.</p>
        </div>
        <form onSubmit={handleLogin}>
          <div>
            <label htmlFor="email">Email address:</label>
            <input
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="john@mail.com"
              autoFocus
            />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;"
            />
          </div>
          <button type="submit" className="w-full">
            Login
          </button>
        </form>
        <Link to="/register">
          <p>
            Don't have an account? <span>Sign up!</span>
          </p>
        </Link>
      </div>
      <Toaster />
    </section>
  );
};

export default Login;
