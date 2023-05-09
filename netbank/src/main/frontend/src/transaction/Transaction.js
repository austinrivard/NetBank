import React, { useCallback, useEffect, useState } from 'react';
import './transaction.css'
import { getUserToken } from '../firebase';
import { useNavigate } from 'react-router-dom';

function Text(props) {
  return <span className="text">{props.value}</span>;
}

function Transaction({ type, amount, date, description }) {
  return (
    <div className="transaction">
      <span className="transaction-type">{type}</span>
      <span className="transaction-amount">${amount}</span>
      <span className="transaction-date">{date}</span>
      <span className="transaction-description">{description}</span>
    </div>
  );
}

function TransactionList({ transactions }) {
  return (
    <div className="transaction-list">
      {
        transactions.length != 0 ?
          transactions.map((transaction) => (
            <Transaction {...transaction} />
          ))
          : <span>No transactions yet...</span>
      }
    </div>
  );
}

function TransactionHistory({ transactions }) {
  return (
    <div className="transaction-history-page" >
      <h1>Transaction History</h1>
      <TransactionList transactions={transactions} />
    </div>
  );
}

function TransactionHistoryPage(props) {
  const navigate = useNavigate();

  async function getAccounts() {
    const token = await getUserToken(() => navigate('/'));

    await fetch(`/api/accounts`, {
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

  const [selectedAccount, setSelectedAccount] = useState('');
  useEffect(() => {
    setSelectedAccount(accounts[0]?.number || '');
  }, [accounts]);

  const handleAccountChange = (e) => {
    setSelectedAccount(e.target.value);
  };

  const getTransactions = useCallback(() => {
    console.log(`getting transactions with selectedAccount: ${selectedAccount}`);
    if (selectedAccount === undefined || selectedAccount === '') return;
    // const token = await getUserToken();
    getUserToken(() => navigate('/')
    ).then((token) => fetch(`/api/account/${selectedAccount}/transaction`, {
      headers: {'Authorization': `Bearer ${token}`}
    })).then(response => response.json()
    ).then(data => {
      console.log('getTransactions response: ', data);
      setTransactions(data);
    }).catch(console.error);
  }, [selectedAccount]);

  const [transactions, setTransactions] = useState([]);
  useEffect(() => {
    getTransactions();
  }, [getTransactions]);

  return (
    <div>
      <label htmlFor="account-number">Select an account:</label>
      <select id="account-number" name="account-number" onChange={handleAccountChange} required>
        {/* <option value="">--Please select an account--</option> */}
        {accounts.map((account) => (
          <option value={account.number}>{account.type} - {account.number}</option>
        ))}
      </select>
      <TransactionHistory transactions={transactions} />
    </div>
  );
}

export default TransactionHistoryPage;
