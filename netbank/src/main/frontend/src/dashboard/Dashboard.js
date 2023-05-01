import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './dashboard.css';
import AccountSummary from '../AccountSummary/AccountSummary';
import { getAuth } from 'firebase/auth';
import { getUserToken } from '../firebase';

const dashboardData = {
  accounts: [
    {
      id: 1,
      name: 'Checking Account',
      number: '123456789',
      balance: '$1,234.56',
    },
    {
      id: 2,
      name: 'Savings Account',
      number: '987654321',
      balance: '$9,876.54',
    },
    {
      id: 3,
      name: 'Investment Account',
      number: '555555555',
      balance: '$5,555.55',
    },
  ],
};

const Dashboard = () => {
  async function getAccounts() {
    const token = await getUserToken(() => navigate('/'));

    fetch(`/api/accounts`, {
      headers: {'Authorization': `Bearer ${token}`}
    }).then(response => response.json()
    ).then(data => {
      console.log('getAccounts response: ', data);
      setAccounts(data);
    }).catch(console.error);
  }

  const [accounts, setAccounts] = useState([]);
  useEffect(() => {
    getAccounts();
  }, []);

  const [selectedAccount, setSelectedAccount] = useState();
  useEffect(() => {
    setSelectedAccount(accounts[0]);
  }, [accounts])

  const navigate = useNavigate();

  const handleAccountSelect = (account) => {
    setSelectedAccount(account);
  };

  const handlePaymentsClick = () => {
    navigate('/dashboard/payments');
  };

  const handleTransactionsClick = () => {
    navigate('/dashboard/transactions');
  };

  const handleNewAccountClick = () => {
    navigate('/dashboard/new-account');
  };

  const handleMapsClick = () => {
    navigate('/dashboard/maps');
  };

  const handleDelete = () => {
    setSelectedAccount(null);
    getAccounts();
  };

  return (
    <div className="dashboard">
      <nav className="navigation">
        <ul className="horizontal">
          <li>
            <button onClick={handlePaymentsClick}>Payments</button>
          </li>
          <li>
            <button onClick={handleTransactionsClick}>
              Transaction History
            </button>
          </li>
          <li>
            <button onClick={handleNewAccountClick}>Open Account</button>
          </li>
          <li>
            <button onClick={handleMapsClick}>Maps</button>
          </li>
        </ul>
      </nav>
      <div className="account-container">
        {accounts && <AccountList
          accounts={accounts}
          selectedAccount={selectedAccount}
          onSelect={handleAccountSelect}
        />}
        {selectedAccount && <AccountDetails account={selectedAccount} onDeleted={handleDelete} />}
      </div>
    </div>
  );
};

const AccountList = ({ accounts, selectedAccount, onSelect }) => {
  return (
    <div className="account-box">
      <ul>
        {accounts.map((account) => (
          <li key={account.number}>
            <button
              className={`account-button ${
                (selectedAccount && account.number === selectedAccount.number) ? 'selected' : ''
              }`}
              onClick={() => onSelect(account)}
            >
              {account.type}<br />
              Account #: {account.number}<br />
              Balance: ${account.balance}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

const AccountDetails = ({ account, onDeleted }) => {
  const navigate = useNavigate();
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleConfirmationClick = () => {
    setShowConfirmation(true);
  };

  const handleCancelClick = () => {
    setShowConfirmation(false);
  };

  const handleCloseClick = async () => {
    // TODO: handle account closure
    await deleteAccount();
    setShowConfirmation(false);
    onDeleted();
  };

  async function deleteAccount() {
    const token = await getUserToken(() => navigate('/'));

    await fetch(`/api/account`, {
      method: 'DELETE',
      headers: {'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json'},
      body: `{"number": "${account.number}"}`
    }).then(response => response.json()
    ).then(data => {
      console.log('deleteAccount response: ', data);
    }).catch(console.error);
  }

  return (
    <div className="account-details">
      <h2>Account Details</h2>
      <div className="account-info">
        <ul>
          <li><strong>Account Type:</strong> {account.type}</li>
          <li><strong>Account Number:</strong> {account.number}</li>
          <li><strong>Balance</strong>{account.balance}</li>
        </ul>
      </div>

      {showConfirmation ? (
        <div className="confirmation-container">
          <p>Are you sure you want to close this account?</p>
          <div className="button-container">
            <button onClick={handleCloseClick}>Yes</button>
            <button onClick={handleCancelClick}>No</button>
          </div>
        </div>
      ) : (
        <div className="button-container">
          <button onClick={handleConfirmationClick}>Close Account</button>
        </div>
      )}
    </div>
  );
};


export default Dashboard;
