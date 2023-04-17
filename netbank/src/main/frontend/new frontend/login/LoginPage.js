import React from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css';

const Login = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/dashboard');
  };

  return (
    <div className="login-container">
      <Input label="Username" name="username" />
      <Input label="Password" type="password" name="password" />
      <Button label="Login" onClick={handleClick} />
    </div>
  );
};

const Input = ({ label, type = 'text', name }) => {
  return (
    <div className="input-container">
      <label htmlFor={name}>{label}</label>
      <input type={type} name={name} />
    </div>
  );
};

const Button = ({ label, onClick }) => {
  return (
    <button className="button" onClick={onClick}>
      <Text value={label} />
    </button>
  );
};

const Text = ({ value }) => {
  return <span>{value}</span>;
};

export default Login;
