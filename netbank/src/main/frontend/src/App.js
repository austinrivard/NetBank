
import { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import styled, { css } from 'styled-components';
import { LoginFrom } from './LoginForm';
import { RegisterFrom } from './RegisterForm';
import Home from './Navigation/Home';

import AdminView from './admin/AdminView';
import Navigation from './Navigation';

const StyledButton = styled.button`
    border-radius: 5px;
    background-color: ${props => (props.primary ? '#F7A072' : '#a1cdf1')};
    color: #fff;
    cursor: pointer;
    min-height: 5vh;
    align-items: center;
    justifiy-content: center;
`

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentForm,setCurrentForm] = useState('login');

  function toggleLoggedIn() {
    setLoggedIn(!loggedIn);
  }
  const toggleForm = (formName) => {
    setCurrentForm(formName);
  }
  return (
    <div className="App">
      <header className="App-header">
        <h1>NetBank</h1>
      </header>
      <main>
        <div>
          {currentForm === "login" ? <LoginFrom onFormSwitch = {toggleForm}/> : <RegisterFrom onFormSwitch={toggleForm}/>}
        </div>
        <div>
        <StyledButton onClick={toggleLoggedIn} {...loggedIn || {primary: true}}>
          {`Log ${loggedIn ? 'out' : 'in'}`}
        </StyledButton>
        {loggedIn && <AdminView />}
        </div>
      </main>
    </div>
  );
}