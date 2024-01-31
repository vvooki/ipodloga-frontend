import { useState, useRef, useEffect } from 'react';
import illustration from './../images/login-illustration.svg';
import './css/Login.css';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import toast from 'react-hot-toast';
import axios from 'axios';
import { type } from '@testing-library/user-event/dist/type';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [indexNumber, setIndexNumber] = useState('');
  let navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      if (password !== password2) {
        toast.error('Passwords must be the same');
        return;
      }
      const userCredentials = {
        email,
        password,
        firstName,
        lastName,
        indexNumber,
        isAdmin: false,
        isFullTime: false,
      };

      await axios.post(
        'http://localhost:8080/api/auth/register',
        userCredentials,
      );
      navigate('/login');
      toast.success('Success! Account created.');
    } catch (error) {
      toast.error(error);
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
          <h2>Sign up to iPodloga</h2>
          <p>Start managing your projects with ease.</p>
        </div>

        <form onSubmit={handleSignUp}>
          <div className="w-fit max-h-[400px] overflow-y-auto">
            <div>
              <label htmlFor="email">Email address:</label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                name="email"
                id="email"
                placeholder="john@mail.com"
                autoFocus
                required
              />
            </div>
            <div>
              <label htmlFor="firstName">First Name:</label>
              <input
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                type="text"
                name="firstName"
                id="firstName"
                placeholder="John"
                required
              />
            </div>
            <div>
              <label htmlFor="lastName">Last Name:</label>
              <input
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                type="text"
                name="lastName"
                id="lastName"
                placeholder="Doe"
                required
              />
            </div>
            <div>
              <label htmlFor="index">Index Number:</label>
              <input
                value={indexNumber}
                onChange={(e) => setIndexNumber(e.target.value)}
                type="text"
                name="indexNumber"
                id="indexNumber"
                placeholder="123456"
                required
              />
            </div>
            <div>
              <label htmlFor="password">Password:</label>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                name="password"
                id="password"
                placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;"
                required
              />
            </div>
            <div>
              <label htmlFor="password2">Repeat password:</label>
              <input
                value={password2}
                onChange={(e) => setPassword2(e.target.value)}
                type="password"
                name="password2"
                id="password2"
                placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;"
                required
              />
            </div>
          </div>
          <button type="submit" className="w-full">
            Register
          </button>
        </form>

        <Link to="/login">
          <p>
            Already have an account? <span>Sign in!</span>
          </p>
        </Link>
      </div>
    </section>
  );
};

export default Register;
