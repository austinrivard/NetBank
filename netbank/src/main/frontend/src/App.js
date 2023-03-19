import logo from './logo.svg';
import './App.css';
import styled from 'styled-components';


import { useState } from 'react';
import AdminView from './admin/AdminView';

const StyledButton = styled.button`
    border-radius: 5px;
    background-color: ${props => (props.primary ? '#F7A072' : '#a1cdf1')};
    color: #fff;
    padding: 10px 15px;
    outline: none;
    border: none;
    cursor: pointer;
    margin: 15px;
`

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  function toggleLoggedIn() {
    setLoggedIn(!loggedIn);
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>NetBank</h1>
      </header>
      <main>
        <StyledButton onClick={toggleLoggedIn} {...loggedIn || {primary: true}}>
          {`Log ${loggedIn ? 'out' : 'in'}`}
        </StyledButton>
        {loggedIn && <AdminView />}
      </main>
    </div>
  );
}