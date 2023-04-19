import React from 'react';
import { useNavigate } from 'react-router-dom';
import './front.css';

const Front = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleRegisterClick = () => {
    navigate('/register');
  };

  return (
    <div className="front-container">
      <Button label="Login" onClick={handleLoginClick} />
      <Button label="Register" onClick={handleRegisterClick} />
    </div>
  );
};

const Button = ({ label, onClick }) => {
  return (
    <button className="front-button" onClick={onClick}>
      <Text value={label} />
    </button>
  );
};

const Text = ({ value }) => {
  return <span>{value}</span>;
};

export default Front;