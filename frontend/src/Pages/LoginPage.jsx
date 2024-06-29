import React from 'react';
import Header from "../components/Header";
import './LoginPage.css'; // We'll put the CSS in a separate file

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  return (
    <main>
    <div><Header /></div>
    <div className="container py-5 px-5 bg">
      <div className="row justify-content-between bg-white rounded-start-4">
        <div className="col-lg-7 d-flex justify-content-center align-items-center">
          <div className="login-card py-lg-0 py-5">
            <h2 className="fw-semibold">Welcome back</h2>
            <p className="fw-light">Welcome back ! Please login your Account</p>
            <form action="#" className="form">
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
                <div className="col-12 d-flex justify-content-between mt-3 checkbox">
                  <div className="d-flex">
                    <input className="form-check-input" type="checkbox" id="remember" />
                    <label htmlFor="remember" className="fw-medium ms-2">Remember password</label>
                  </div>
                  <a href="#" className="fw-semibold text-decoration-none">Forgot password</a>
                </div>
              </div>
              <button type="submit" className="btn mt-4 w-100">Login</button>
              <button type="button" className="btn mt-4 w-100 d-flex justify-content-center align-items-center">
                <i className="bi bi-apple me-2 fs-5"></i>
                <span>Log in with Apple</span>
              </button>
              <button type="button" className="btn mt-4 w-100 d-flex justify-content-center align-items-center">
                <img src="/img/google.png" alt="" width="5%" className="me-2" />
                <span>Log in with Google</span>
              </button>
            </form>
            <p className="text-center signup mt-4">Don't have account? <a href="/register" className="text-decoration-none fw-semibold">Register now</a></p>
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

export default LoginPage;