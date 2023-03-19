import styled from 'styled-components';
import { useState, useEffect } from 'react';

function AccountRow({ account }) {
  const balance = (
    <span >
      ${account.dollars}.{account.cents}
    </span>
  );

  return (
    <tr>
      <td>{account.id}</td>
      <td>{account.name}</td>
      <td>{account.address}</td>
      <td>{balance}</td>
    </tr>
  );
}

const StyledTable = styled.table`
  border-collapse: collapse;
  margin: auto;
`;

export default function AccountsPanel() {
  const [accounts, setAccounts] = useState([]);
  const [createdAccount, setCreatedAccount] = useState(null);

  useEffect(() => {
    getAccountsFromAPI();
  }, [createdAccount]);

  function getAccountsFromAPI() {
    fetch('/api/accounts'
    ).then(response => response.json()
    ).then(data => {
      console.log('getAccounts response: ', data);
      setAccounts(data);
    }).catch(console.error);
  }

  function addAccount(e) {
    e.preventDefault();
    fetch('/api/account', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ 'name': e.target.name.value, 'address': e.target.address.value })
    }).then(response => response.json()
    ).then(data => {
      console.log('addAccount response: ', data);
      setCreatedAccount(data);
    }).catch(console.error);
  }

  return (
    <div className="AccountsPanel">
      <h2>Accounts</h2>
      <button onClick={getAccountsFromAPI}>get accounts</button>
      <form onSubmit={addAccount}>
        <label>name</label>
        <input type="text" name="name"></input>
        <br />
        <label>address</label>
        <input type="text" name="address"></input>
        <br />
        <button type="submit">submit</button>
      </form>
      <div className="content">
        {createdAccount && <p>Created account: {createdAccount.id}</p>}
        <StyledTable>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Address</th>
              <th>Balance</th>
            </tr>
          </thead>
          <tbody>
            {
              accounts.map(
                account => <AccountRow key={account.id} account={account} />
              )
            }
          </tbody>
        </StyledTable>
      </div>
    </div>
  );
}