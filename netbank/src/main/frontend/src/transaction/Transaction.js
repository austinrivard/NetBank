import React, { useEffect, useState } from 'react';
import './transaction.css'
import { getUserToken } from '../firebase';
import { useNavigate } from 'react-router-dom';

function Text(props) {
  return <span className="text">{props.value}</span>;
}

function Transaction(props) {
  return (
    <div className="transaction">
      <span className="transaction-type">{props.transaction.type}</span>
      <span className="transaction-amount">${props.transaction.amount}</span>
      <span className="transaction-date">{props.transaction.date}</span>
      <span className="transaction-description">{props.transaction.description}</span>
    </div>
  );
}

function TransactionList(props) {
  return (
    <div className="transaction-list">
      {
        props.tansactions ?
          props.transactions.map((transaction) => (
            <Transaction key={transaction.id} transaction={transaction} />
          ))
          : <span>No transactions yet...</span>
          
      }
    </div>
  );
}

function TransactionHistory(props) {
  return (
    <div className="transaction-history-page">
      <h1>Transaction History</h1>
      <TransactionList transactions={props.transactions} />
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

  const [selectedAccount, setSelectedAccount] = useState();
  useEffect(() => {
    setSelectedAccount(accounts[0]?.number || null);
  }, [accounts]);

  const handleAccountChange = (e) => {
    setSelectedAccount(e.target.value);
  };

  async function getTransactions() {
    const token = await getUserToken(() => navigate('/'));

    fetch(`/api/account/${selectedAccount}/transaction`, {
      headers: {'Authorization': `Bearer ${token}`}
    }).then(response => response.json()
    ).then(data => {
      console.log('getTransactions response: ', data);
      setTransactions(data);
    }).catch(console.error);
  }

  const [transactions, setTransactions] = useState([]);
  useEffect(() => {
    getTransactions();
  }, [selectedAccount]);

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
