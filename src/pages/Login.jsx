import React from 'react';
import illustration from './../images/login-illustration.svg';
import './css/Login.css';
const Login = () => {
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
        <form action="" method="post">
          <div>
            <label htmlFor="email">Email address:</label>
            <input
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
              type="password"
              name="password"
              id="password"
              placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;"
            />
          </div>
          <button type="submit">Login</button>
        </form>
        <a href="">
          <p>
            Don't have an account? <span>Sign up!</span>
          </p>
        </a>
      </div>
    </section>
  );
};

export default Login;
