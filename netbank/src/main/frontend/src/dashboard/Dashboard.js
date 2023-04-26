import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './dashboard.css';
import AccountSummary from '../AccountSummary/AccountSummary';

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
  const [selectedAccount, setSelectedAccount] = useState(
    dashboardData.accounts[0]
  );
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

  const handleStatementsClick = () => {
    navigate('/dashboard/statements');
  };

  const handleNewAccountClick = () => {
    navigate('/dashboard/new-account');
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
            <button onClick={handleStatementsClick}>Statements</button>
          </li>
          <li>
            <button onClick={handleNewAccountClick}>Open Account</button>
          </li>
          <li>
            <button onClick={handlePaymentsClick}>Maps</button>
          </li>
        </ul>
      </nav>
      <div className="account-container">
        <AccountList
          accounts={dashboardData.accounts}
          selectedAccount={selectedAccount}
          onSelect={handleAccountSelect}
        />
        <AccountDetails account={selectedAccount} />
      </div>
    </div>
  );
};

const AccountList = ({ accounts, selectedAccount, onSelect }) => {
  return (
    <div className="account-box">
      <ul>
        {accounts.map((account) => (
          <li key={account.id}>
            <button
              className={`account-button ${
                account.id === selectedAccount.id ? 'selected' : ''
              }`}
              onClick={() => onSelect(account)}
            >
              {account.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

const AccountDetails = ({ account }) => {
  return (
    <div className="account-details">
      <h2>Account Details</h2>
      <ul>
        <li>Name: {account.name}</li>
        <li>Number: {account.number}</li>
        <li>Balance: {account.balance}</li>
      </ul>
      <div className="account-summary-box">
        <AccountSummary account={account} />
      </div>
    </div>
  );
};

const Text = ({ value }) => {
  return <p className="text">{value}</p>;
};

export default Dashboard;
