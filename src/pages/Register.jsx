import { useState, useRef, useEffect } from 'react';
import illustration from './../images/login-illustration.svg';
import './css/Login.css';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import toast, { Toaster } from 'react-hot-toast';

const Register = () => {
  const [email, setEmail] = useState('test@mail.com');
  const [password, setPassword] = useState('123456');
  const [password2, setPassword2] = useState('123456');
  const [error, setError] = useState(true);
  let navigate = useNavigate();
  const timerRef = useRef(null);
  const handleSignUp = async (e) => {
    e.preventDefault();
    setError(true);
    if (password === password2) {
      await auth
        .createUserWithEmailAndPassword(email, password)
        .then((userCredentials) => {
          const user = userCredentials.user;
          setError(false);
        })
        .catch((error) => setError(true));
      const loading = toast.loading('Creating account...');
      if (error === false) {
        toast.success('Success! Account created.', { id: loading });
        timerRef.current = setTimeout(() => navigate('/login'), 3000);
      } else {
        toast.error('Something went wrong...', { id: loading });
      }
      // toast.loading('Creating account');
      // try {
      //   const promise = auth.createUserWithEmailAndPassword(email, password);
      //   toast.promise(promise, {
      //     loading: 'Loading',
      //     success: 'Success! Account created',
      //     error: 'Error while creating account',
      //   });
      // } catch (error) {
      //   setError(true);
      //   alert('ustawiam error ', error.message);
      // } finally {
      //   if (!error) {
      //     timerRef.current = setTimeout(() => navigate('/login'), 3000);
      //   }
      // }
    } else {
      console.log('entered passwords must be the same');
    }
  };

  useEffect(() => {
    // Clear the interval when the component unmounts
    return () => clearTimeout(timerRef.current);
  }, []);

  return (
    <section className="login-section">
      <div className="illustration-container">
        <img src={illustration} alt="login illustration" />
      </div>
      <div className="login-container">
        <div className="login-text">
          <h2>Sign up to iPodloga</h2>
          <p>Start managing your projects with ease.</p>
        </div>
        <form onSubmit={handleSignUp}>
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
            />
          </div>
          <button type="submit">Register</button>
        </form>
        <Link to="/login">
          <p>
            Already have an account? <span>Sign in!</span>
          </p>
        </Link>
      </div>
      <Toaster />
    </section>
  );
};

export default Register;
