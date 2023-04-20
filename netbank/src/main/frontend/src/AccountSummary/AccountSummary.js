import styled from 'styled-components';
import { useState, useEffect } from 'react';

function TransactionRow({ transaction }) {
  return (
    <tr>
      <td>{transaction.date}</td>
      <td>{transaction.description}</td>
      <td>{transaction.withdrawal}</td>
      <td>{transaction.deposit}</td>
      <td>{transaction.balance}</td>
    </tr>
  );
}

const StyledTable = styled.table`
  border-collapse: collapse;
  margin: auto;
`;

function TransactionTable({ transactions }) {
  return transactions ?? (
    <StyledTable>
      <thead>
        <tr>
          <th>Date</th>
          <th>Description</th>
          <th>Withdrawal</th>
          <th>Deposit</th>
          <th>Balance</th>
        </tr>
      </thead>
      <tbody>
        {
          transactions.map(
            transaction => <TransactionRow key={transaction.id} transaction={transaction} />
          )
        }
      </tbody>
    </StyledTable>
  );
}


export default function AccountSummary({ account }) {
  const [transactions, setTransactions] = useState([]);
  const [createdTransaction, setCreatedTransaction] = useState(null);

  useEffect(() => {
    getTransactions();
  }, [createdTransaction]); // refresh transactions when createdTransaction changes

  function getTransactions() {
    fetch(`/api/account/${account.id}/transaction`
    ).then(response => response.json()
    ).then(data => {
      console.log('getTransactions response: ', data);
      setTransactions(data);
    }).catch(console.error);
  }

  function addTransaction(e) {
    e.preventDefault();
    fetch(`/api/account/${account.id}/transaction`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        'date': e.target.date.value,
        'description': e.target.description.value,
        'type': e.target.type.value,
        'amount': e.target.amount.value,
        'balance': e.target.balance.value,
        'account_id': account.id
      })
    }).then(response => response.json()
    ).then(data => {
      console.log('addTransaction response: ', data);
      setCreatedTransaction(data);
    }).catch(console.error);
  }

  return (
    <div className="AccountSummary">
      <h2>Account Summary</h2>
      <h3>Account ID: {account.id}</h3>
      <button onClick={getTransactions}>get transactions</button>
      <form onSubmit={addTransaction}>
        <label>date</label>
        <input type="text" name="date"></input>
        <br />
        <label>type</label>
        <input type="text" name="type"></input>
        <br />
        <label>description</label>
        <input type="text" name="description"></input>
        <br />
        <label>amount</label>
        <input type="text" name="amount"></input>
        <br />
        <label>balance</label>
        <input type="text" name="balance"></input>
        <br />
        <button type="submit">submit</button>
      </form>
      <div className="content">
        {createdTransaction && <p>Created transaction: {createdTransaction.id}</p>}
        <TransactionTable transactions={transactions} />
      </div>
    </div>
  );
}