import React from 'react';
import './transaction.css'

function Text(props) {
  return <span className="text">{props.value}</span>;
}

function Transaction(props) {
  return (
    <div className="transaction">
      <span className="transaction-type">{props.transaction.type}</span>
      <span className="transaction-amount">${props.transaction.amount}</span>
      <span className="transaction-date">{props.transaction.date}</span>
    </div>
  );
}

function TransactionList(props) {
  return (
    <div className="transaction-list">
      {props.transactions.map((transaction) => (
        <Transaction key={transaction.id} transaction={transaction} />
      ))}
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
  const transactions = [
    { id: 1, type: 'Payment', amount: 100, date: '2023-04-14' },
    { id: 2, type: 'Withdrawal', amount: 50, date: '2023-04-13' },
    { id: 3, type: 'Deposit', amount: 200, date: '2023-04-12' },
  ];

  return (
    <div>
      <TransactionHistory transactions={transactions} />
    </div>
  );
}

export default TransactionHistoryPage;
