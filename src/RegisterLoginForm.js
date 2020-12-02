import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import {selectNav} from './actions/navActions';



import './RegisterLoginForm.css'

function RegisterLoginForm() {
  const history = useHistory();
  const dispatch = useDispatch();

  const login = {
    username: '',
    password: ''
  }

  const register = {
    first_name: '',
    last_name: '',
    email: '',
    username: '',
    password: ''
  }

  const [formView, setFormView] = useState('login')
  const [form, setForm] = useState(login);


  useEffect(() => {
    dispatch(selectNav('LOGINPAGE'))
  }, [])

  const loginSetup = () => {
    setFormView('login');
    setForm(login)
  }

  const registerSetup = () => {
    setFormView('register');
    setForm(register)
  }
  


  const handleChange = evt => {
    const { name, value } = evt.target;
    setForm(f => ({
      ...f,
      [name]: value
    }));
  }

  const handleSubmit = evt => {
    evt.preventDefault();
    let data = {};
    if (formView === 'login') {
      const {username, password} = form
      data = {...data, username, password}
    } else if (formView === 'register') {
      const {first_name, last_name, email, username, password} = form
      data = {...data, first_name, last_name, email, username, password}
    }
    console.log(data)
   
  }

  return (
    <div className="container-fluid">
      <div className="row d-flex align-items-center">
        <div className="col-12">
        <ul className="nav nav-tabs" id="myTab" role="tablist">
  <li className="nav-item">
    <a onClick={() => loginSetup()} className="nav-link active" id="login-tab" data-toggle="tab" href="#login" role="tab" aria-controls="login" aria-selected="true">Login</a>
  </li>
  <li className="nav-item">
    <a onClick={() => registerSetup('register')} className="nav-link" id="register-tab" data-toggle="tab" href="#register" role="tab" aria-controls="register" aria-selected="false">Register</a>
  </li>
</ul>
<div className="tab-content" id="myTabContent">
  <div className="tab-pane fade show active" id="login" role="tabpanel" aria-labelledby="login-tab">
  <div className="card">
  <div className="card-body">
  <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Username</label>
                <input
                  name="username"
                  className="form-control"
                  value={form.username}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>Password</label>
                <input
                  type="password"
                  name="password"
                  className="form-control"
                  value={form.password}
                  onChange={handleChange}
                />
              </div>
              <button
                type="submit"
                className="btn btn-primary float-right"
                onSubmit={handleSubmit}
              >
                Login
              </button>
            </form>
          
  </div>
</div>
  </div>
  <div className="tab-pane fade" id="register" role="tabpanel" aria-labelledby="register-tab">
  <div className="card">
  <div className="card-body">
  <form onSubmit={handleSubmit}>
  <div className="form-group">
                <label>First Name</label>
                <input
                  type="text"
                  name="first_name"
                  className="form-control"
                  value={form.first_name}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>Last Name</label>
                <input
                  type="text"
                  name="last_name"
                  className="form-control"
                  value={form.last_name}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  value={form.email}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>Username</label>
                <input
                  name="username"
                  className="form-control"
                  value={form.username}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>Password</label>
                <input
                  type="password"
                  name="password"
                  className="form-control"
                  value={form.password}
                  onChange={handleChange}
                />
              </div>
              <button
                type="submit"
                className="btn btn-primary float-right"
                onSubmit={handleSubmit}
              >
                Register
              </button>
            </form>
  </div>
</div>
    </div>
</div>
        </div>
      </div>
    </div>
 
  );
}

export default RegisterLoginForm;
