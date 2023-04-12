
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
//import { google } from '@google/maps';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import './App.css';
import styled, { css } from 'styled-components';
import { LoginFrom } from './LoginForm';
import { RegisterFrom } from './RegisterForm';
import Home from './Navigation/Home';

import AdminView from './admin/AdminView';
import Navigation from './Navigation';
import HomePage from './pages/HomePage';


function App() {
  //login
  // const [toggleOn, setToggleOn] = useState(false);
  
  // const handleToggleOn = () => {
  //   setToggleOn(true);
  // };
  
  // const handleToggleOff = () => {
  //   setToggleOn(false);
  // };

  const [showLoginForm, setShowLoginForm] = useState(false);
  
  const handleToggleLoginForm = () => {
    setShowLoginForm(!showLoginForm);
  };

  //register
  const [showRegisterForm, setShowRegisterForm] = useState(false);
  
  const handleToggleRegisterForm = () => {
    setShowRegisterForm(!showRegisterForm);
  };

  //transaction
  const [showTransactionForm, setShowTransactionForm] = useState(false);

  const handleToggleTransactionForm = () => {
    setShowTransactionForm(!showTransactionForm);
  };
  //admin
  const [showAdminForm, setShowAdminForm] = useState(false);

  const handleToggleAdminForm = () => {
    setShowAdminForm(!showAdminForm);
  };
  //admin view
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentForm,setCurrentForm] = useState('login');

  function toggleLoggedIn() {
    setLoggedIn(!loggedIn);
  }
  const toggleForm = (formName) => {
    setCurrentForm(formName);
  }
  const StyledButton = styled.button`
    border-radius: 5px;
    background-color: ${props => (props.primary ? '#F7A072' : '#a1cdf1')};
    color: #fff;
    cursor: pointer;
    min-height: auto;
    align-items: left;
    justifiy-content: center;
`
  //atm
  // const GoogleMaps = () => {
  //   useEffect(() => {
  //     const initMap = async () => {
  //       const { Map } = await google.maps.importLibrary("maps");
  
  //       const position = { lat: -25.344, lng: 131.031 };
  
  //       const map = new Map(document.getElementById("map"), {
  //         zoom: 4,
  //         center: position,
  //         mapId: "DEMO_MAP_ID",
  //       });
  
  //       const marker = new google.maps.Marker({
  //         position: position,
  //         map: map,
  //         title: "Uluru",
  //       });
  //     };
  
  //     initMap();
  //   }, []);
  
  //   return <div id="map" style={{ height: "400px" }}></div>;
  // };
  
  // const ATMButton = () => {
  //   const [showMap, setShowMap] = useState(false);
  
  //   const handleClick = () => {
  //     setShowMap(!showMap);
  //   };
  
  //   return (
  //     <div>
  //       <button onClick={handleClick}>ATM</button>
  //       {showMap && <GoogleMaps />}
  //     </div>
  //   );
  // };

  const LoginForm = () => {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <form style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px', border: '1px solid #ccc', borderRadius: '5px' }}>
          <div style={{ marginBottom: '10px' }}>
            <label htmlFor="username" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Username</label>
            <input type="text" id="username" name="username" style={{ padding: '10px', border: '1px solid #ccc', borderRadius: '5px', width: '100%', maxWidth: '300px' }} />
          </div>
          <div style={{ marginBottom: '10px' }}>
            <label htmlFor="password" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Password</label>
            <input type="password" id="password" name="password" style={{ padding: '10px', border: '1px solid #ccc', borderRadius: '5px', width: '100%', maxWidth: '300px' }} />
          </div>
          <button type="submit" style={{ padding: '10px 20px', backgroundColor: 'orange', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Login</button>
        </form>
      </div>
    );
  };
   
  
  const RegisterForm = () => {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <form style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px', border: '1px solid #ccc', borderRadius: '5px' }}>
          <div style={{ marginBottom: '10px' }}>
            <label htmlFor="email" style={{ display: 'block', marginBottom: '5px' }}>Email:</label>
            <input type="email" id="email" name="email" style={{ width: '100%', padding: '8px', fontSize: '16px', borderRadius: '3px', border: '1px solid #ccc' }} />
          </div>
          <div style={{ marginBottom: '10px' }}>
            <label htmlFor="username" style={{ display: 'block', marginBottom: '5px' }}>Username:</label>
            <input type="text" id="username" name="username" style={{ width: '100%', padding: '8px', fontSize: '16px', borderRadius: '3px', border: '1px solid #ccc' }} />
          </div>
          <div style={{ marginBottom: '10px' }}>
            <label htmlFor="password" style={{ display: 'block', marginBottom: '5px' }}>Password:</label>
            <input type="password" id="password" name="password" style={{ width: '100%', padding: '8px', fontSize: '16px', borderRadius: '3px', border: '1px solid #ccc' }} />
          </div>
          <div style={{ marginBottom: '10px' }}>
            <label htmlFor="confirmPassword" style={{ display: 'block', marginBottom: '5px' }}>Confirm Password:</label>
            <input type="password" id="confirmPassword" name="confirmPassword" style={{ width: '100%', padding: '8px', fontSize: '16px', borderRadius: '3px', border: '1px solid #ccc' }} />
          </div>
          <div style={{ marginBottom: '10px' }}>
            <label htmlFor="account-type" style={{ display: 'block', marginBottom: '5px' }}>Account Type:</label>
            <select id="account-type" style={{ width: '100%', padding: '8px', fontSize: '16px', borderRadius: '3px', border: '1px solid #ccc' }}>
              <option value="checking">Checking</option>
              <option value="savings">Savings</option>
            </select>
          </div>
          <button type="submit" style={{ backgroundColor: 'orange', color: '#fff', padding: '10px 20px', fontSize: '16px', borderRadius: '3px', border: 'none', cursor: 'pointer' }}>Register</button>
        </form>
      </div>
    );
  };
  
  const TransactionForm = () => {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <form style={{ display: 'flex', flexDirection: 'column', gap: '10px', padding: '20px', backgroundColor: '#f2f2f2', borderRadius: '5px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
            <label htmlFor="transaction-type">Transaction type:</label>
            <select id="transaction-type">
              <option value="withdraw">Withdraw</option>
              <option value="transfer">Transfer</option>
            </select>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
            <label htmlFor="amount">Amount:</label>
            <input type="number" id="amount" style={{ padding: '5px', borderRadius: '5px', border: '1px solid #ccc' }} />
          </div>
          <button style={{ backgroundColor: 'orange', color: 'white', padding: '10px', borderRadius: '5px', border: 'none', cursor: 'pointer' }}>Submit</button>
        </form>
      </div>
    );
  };
  
  const AdminForm = () => {
    const [password, setPassword] = useState('');
    const handlePasswordChange = (event) => {
      setPassword(event.target.value);
    };
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const handleSubmit = (event) => {
      event.preventDefault();
      if (password === 'adminPassword') {
        setIsAuthenticated(true);
      } else {
        alert('Incorrect password. Please try again.');
      }
    };

    if (!isAuthenticated) {
      return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <label style={{ marginBottom: '10px' }}>
              Password:
              <input type="password" value={password} onChange={handlePasswordChange} style={{ marginLeft: '10px', padding: '5px' }} />
            </label>
            <button type="submit" style={{ padding: '5px 10px', borderRadius: '10px', backgroundColor: 'orange', color: 'white', border: 'none' }}>Submit</button>
          </form>
        </div>
      );
    } else {
      return(
        <div>
        <StyledButton onClick={toggleLoggedIn} {...loggedIn || {primary: true}}>
          {`Log ${loggedIn ? 'out' : 'in'}`}
        </StyledButton>
        {loggedIn && <AdminView />}
        </div>
        
      )
    }
  };
  
    return (
      <div className='dashboard-container'>
        <h1>NetBank</h1>
        <button onClick={handleToggleLoginForm}>Returning User</button>
        {showLoginForm && <LoginForm />}
        <button onClick={handleToggleRegisterForm}>New User</button>
        {showRegisterForm && <RegisterForm />}
        <button onClick={handleToggleTransactionForm}>Transactions</button>
        {showTransactionForm && <TransactionForm />}
        <button onClick={handleToggleAdminForm}>Admin</button>
        {showAdminForm && <AdminForm />}
        <button>ATM</button>
            </div>
          );
}
export default App;