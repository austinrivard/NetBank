import React, { useState } from 'react';
import "./open.css"
import { getAuth } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

function OpenAccount() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [selectedAccount, setSelectedAccount] = useState('');

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleAccountChange = (e) => {
    setSelectedAccount(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you can write the code to submit the form and open the account

    openAccount(selectedAccount);
  };

  async function openAccount(type) {
    const token = await getAuth().currentUser.getIdToken();

    await fetch('/api/account', {
      method: 'POST',
      headers: {'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json'},
      body: JSON.stringify({ type })
    }).then(response => response.json()
    ).then(data => {
      console.log('openAccount response: ', data);
    }).catch(console.error);

    navigate('/dashboard');
  }

  return (
    <div className="open-container">
      <h2>Open a New Account</h2>
      <form onSubmit={handleSubmit}>
        {/* <div className="open-form">
          <label htmlFor="name">Enter Account Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={handleNameChange}
            required
          />
        </div> */}
        <div>
          <label htmlFor="account-type">Select an account type:</label>
          <select id="account-type" name="account-type" onChange={handleAccountChange} required>
            <option value="">--Please select an account type--</option>
            <option value="checking">Checking Account</option>
            <option value="savings">Savings Account</option>
            {/* <option value="credit">Credit Card</option> */}
          </select>
        </div>
        <button type="submit">Open Account</button>
      </form>
    </div>
  );
}

export default OpenAccount;
