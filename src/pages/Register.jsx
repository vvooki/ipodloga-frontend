import { useState, useRef, useEffect } from 'react';
import illustration from './../images/login-illustration.svg';
import './css/Login.css';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import toast from 'react-hot-toast';
import axios from 'axios';

const Register = () => {
  const [email, setEmail] = useState('test@mail.com');
  const [password, setPassword] = useState('123456');
  const [password2, setPassword2] = useState('123456');
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [index, setIndex] = useState('');
  const [uid, setUid] = useState('');
  const [error, setError] = useState(false);
  let navigate = useNavigate();
  const timerRef = useRef(null);

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      if (password === password2) {
        const credentials = await auth.createUserWithEmailAndPassword(
          email,
          password
        );
        console.log(typeof credentials.user.uid);
        setUid(credentials.user.uid);
      } else {
        toast.error('Passwords must be the same...');
      }
    } catch (error) {
      toast.error('Something went wrong...');
    }
    console.log('email', email);
  };

  const handleSaveUserToDb = async (e) => {
    e.preventDefault();
    const data = {
      email: email,
      imie: name,
      nazwisko: surname,
      nr_indeksu: index,
      student_id: Number(uid),
    };
    try {
      const res = await axios.post(`http://localhost:8080/student`, data);
      navigate('/login');
      toast.success('Success! Account created.');
    } catch (error) {}
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
        {uid === '' ? (
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
        ) : (
          <form onSubmit={handleSaveUserToDb}>
            <div>
              <label htmlFor="name">Name:</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                name="name"
                id="name"
                placeholder="Jan"
                autoFocus
              />
            </div>
            <div>
              <label htmlFor="surname">Surname:</label>
              <input
                value={surname}
                onChange={(e) => setSurname(e.target.value)}
                type="text"
                name="surname"
                id="surname"
                placeholder="Kowalski"
              />
            </div>
            <div>
              <label htmlFor="index">Student Index:</label>
              <input
                value={index}
                onChange={(e) => setIndex(e.target.value)}
                type="text"
                name="index"
                id="index"
                placeholder="412865"
              />
            </div>
            <button type="submit">Save</button>
          </form>
        )}
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
