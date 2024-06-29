import React, { useState } from 'react';
import './LoginPage.css'; // We'll put the CSS in a separate file
import Header from "../components/Header";
const RegisterPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  async function register(ev) {
  ev.preventDefault();
  try {
    const response = await fetch('http://localhost:4000/register', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    });
    // Rest of the function...
  } catch (error) {
    console.error('Registration error:', error);
  }
}
  return (
    <main>
    <Header />
    <div className="container py-5 px-5 bg">
      <div className="row justify-content-between bg-white rounded-start-4">
        <div className="col-lg-7 d-flex justify-content-center align-items-center">
          <div className="login-card py-lg-0 py-5">
            <h2 className="fw-semibold">Welcome to our website </h2>
            <p className="fw-light">Welcome for the first time ! Please register now</p>
            <form className="form" onSubmit={register}>
              <div className="row">
                <div className="mb-3 col-12">
                  <label htmlFor="email" className="mb-1 fw-medium">Email</label>
                  <input type="email" className="form-control" id="email" placeholder="Enter Email"
                  value={email}
                  onChange={ev => setEmail(ev.target.value)}
                  />
                </div>
                <div className="col-12">
                  <label htmlFor="password" className="mb-1 fw-medium">Password</label>
                  <input type="password" className="form-control" id="password" placeholder="Enter Password"
                  value={password}
                  onChange={ev => setPassword(ev.target.value)}
                  />
                </div>
              </div>
              <button type="submit" className="btn mt-4 w-100" onClick={register}>Register</button>
              <button type="button" className="btn mt-4 w-100 d-flex justify-content-center align-items-center">
                <i className="bi bi-apple me-2 fs-5"></i>
                <span>Register with Apple</span>
              </button>
              <button type="button" className="btn mt-4 w-100 d-flex justify-content-center align-items-center">
                <img src="/img/google.png" alt="" width="5%" className="me-2" />
                <span>Register with Google</span>
              </button>
            </form>
            <p className="text-center signup mt-4">You already have an account? <a href="/login" className="text-decoration-none fw-semibold">log in now</a></p>
          </div>
        </div>
        <div className="col-lg-5 col-12 p-0">
          <img src="https://images.unsplash.com/photo-1611042553484-d61f84d22784?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=464&q=80"
            alt="" className="img-fluid w-100" />
        </div>
      </div>
    </div>
    </main>
  );
};

export default RegisterPage;