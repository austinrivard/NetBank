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
      <div className="top-content">
        <div className="top-content-overlay">
          <h1>Welcome to NetBank</h1>
          <p>Most reputable bank after SVB</p>
          <div className="button-container">
            <Button label="Login" onClick={handleLoginClick} />
            <Button label="Register" onClick={handleRegisterClick} />
          </div>
        </div>
      </div>
      <div className="bottom-content">
        <div className="bottom-content-image">
          <img src="https://cdn.dribbble.com/users/1068771/screenshots/7857943/media/73f0aaaf7fe399e81105c8e4179d33b8.jpg" alt="Your Image" />
        </div>
        <div className="bottom-content-text">
          <h2>About Us</h2>
          <p>With NetBank, you have a partner that truly understands your financial needs. We offer a limited range of services as our code monkeys are not quite proficient in coding. Our dedicated team of unqualified students is here to help you when their schedule is open, providing you with subpar guidance and support whenever you need it.</p>
        </div>
      </div>
    </div>
  );
};

const Button = ({ label, onClick }) => {
  return (
    <button className="front-button" onClick={onClick}>
      {label}
    </button>
  );
};

export default Front;