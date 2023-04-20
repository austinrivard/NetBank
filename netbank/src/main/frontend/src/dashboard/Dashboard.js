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
    navigate('/dashboard/pay');
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
            <button onClick={handlePaymentsClick}>Pay</button>
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
        </ul>
      </nav>
      <AccountList
        accounts={dashboardData.accounts}
        onSelect={handleAccountSelect}
      />
      <AccountDetails account={selectedAccount} />
    </div>
  );
};

const AccountList = ({ accounts, onSelect }) => {
  return (
    <div className="account-list">
      <h2>Accounts</h2>
      <List
        items={accounts}
        renderItem={(account) => (
          <ListItem key={account.id} item={account} onSelect={onSelect} />
        )}
      />
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
      <AccountSummary account={account} />
    </div>
  );
};

const List = ({ items, renderItem }) => {
  return (
    <ul>
      {items.map((item) => (
        <li key={item.id}>{renderItem(item)}</li>
      ))}
    </ul>
  );
};

const ListItem = ({ item, onSelect }) => {
  return (
    <button className="list-item" onClick={() => onSelect(item)}>
      {item.label}
    </button>
  );
};

const Text = ({ value }) => {
  return <p className="text">{value}</p>;
};

export default Dashboard;
