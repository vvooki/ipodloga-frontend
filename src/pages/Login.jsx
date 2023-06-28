import { useContext, useState } from 'react';
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
      const userCredentials = await auth.signInWithEmailAndPassword(
        email,
        password
      );
      const user = await fetchUser(userCredentials.user.uid);
      dispatch({ type: 'LOGIN', payload: user });
      console.log('Logged as', user.email);
      navigate('/');
    } catch (error) {
      console.log(error);
      toast.error('Wrong email and password...');
    }
  };

  const fetchUser = async (uid) => {
    try {
      const res = await axios.get(`http://localhost:8080/student/${uid}`);
      console.log(res.data);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="login-section">
      <div className="illustration-container">
        <img src={illustration} alt="login illustration" />
      </div>
      <div className="login-container">
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
          <button type="submit">Login</button>
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
