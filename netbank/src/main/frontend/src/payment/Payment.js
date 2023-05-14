import React, { useState, useEffect } from 'react';
import './payment.css';
import { getUserToken } from '../firebase';
import { useNavigate } from 'react-router-dom';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function PaymentPage() {
  const navigate = useNavigate();
  const [startDate, setStartDate] = useState(new Date());
  const [transactionType, setTransactionType] = useState('');
  const [amount, setAmount] = useState('');
  const [recipientRoutingNumber, setRecipientRoutingNumber] = useState('');
  const [recipientAccountNumber, setRecipientAccountNumber] = useState('');
  const [userAccountNumber, setUserAccountNumber] = useState('');
  const [repeating, setRepeating] = useState(false);
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);

  const [accounts, setAccounts] = useState([]);
  useEffect(() => {
    getAccounts();
  }, []);

  const [selectedAccount, setSelectedAccount] = useState('');
  useEffect(() => {
    setSelectedAccount();
  }, [accounts]);

  const handleAccountChange = (e) => {
    setSelectedAccount(e.target.value);
    console.log(`set selected account to: ${JSON.stringify(e.target.value)}`);
  };

  const handleTransactionTypeChange = (e) => {
    setTransactionType(e.target.value);
  };

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const handleRecipientRoutingNumberChange = (e) => {
    setRecipientRoutingNumber(e.target.value);
  };

  const handleRecipientAccountNumberChange = (e) => {
    setRecipientAccountNumber(e.target.value);
  };

  const handleUserAccountNumberChange = (e) => {
    setUserAccountNumber(e.target.value);
  };

  const handleImage1Change = (e) => {
    setImage1(e.target.files[0]);
  };

  const handleImage2Change = (e) => {
    setImage2(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (transactionType === 'withdraw') await executeWithdrawal();
    else if (transactionType === 'deposit') await executeDeposit();
    else if (transactionType === 'transfer') await executeTransfer();
    navigate('/dashboard');
  };

  async function executeWithdrawal() {
    const token = await getUserToken(() => navigate('/'));
    
    const fromAccount = { "number": selectedAccount };
    const toAccount = { "number": "000111222333", "routingNumber": "000111222333" };
    const description = 'Withdraw from ATM';
    const transferArgs = { toAccount, fromAccount, amount, description };

    await fetch(`/api/processTransfer`, {
      method: 'POST',
      headers: {'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json'},
      body: JSON.stringify({ ...transferArgs })
    }).then(response => response.json()
    ).then(data => {
      console.log('executeWithdrawal response: ', data);
      setAccounts(data);
    }).catch(console.error);
  };

  async function executeTransfer() {
    const token = await getUserToken(() => navigate('/'));

    const fromAccount = { "number": selectedAccount };
    const toAccount = { "number": recipientAccountNumber, "routingNumber": recipientRoutingNumber };
    const description = 'Transfer';
    let transferArgs = { toAccount, fromAccount, amount, description };
    if (repeating) transferArgs = { ...transferArgs, startDate };

    console.log(JSON.stringify({...transferArgs}));

    await fetch(`/api/processTransfer`, {
      method: 'POST',
      headers: {'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json'},
      body: JSON.stringify({ ...transferArgs })
    }).then(response => response.json()
    ).then(data => {
      console.log('executeTransfer response: ', data);
      setAccounts(data);
    }).catch(console.error);
  };

  async function executeDeposit() {
    const token = await getUserToken(() => navigate('/'));

    const formData = new FormData();
    
    const today = new Date();
    const account = { "number": selectedAccount };
    // console.log(JSON.stringify(selectedAccount));
    
    formData.append("account", JSON.stringify(account));
    formData.append("amount", JSON.stringify(amount));
    // formData.append("date", `${today.toISOString().replaceAll("-", "").substring(0, 8)}`);
    formData.append("imageFront", image1);
    formData.append("imageBack", image2);
    
    for (var [key, value] of formData.entries()) console.log(key, value);

    await fetch(`/api/depositCheck`, {
      method: 'POST',
      headers: {'Authorization': `Bearer ${token}`},
      body: formData
    }).then(response => response.json()
    ).then(data => {
      console.log('depositCheck response: ', data);
      setAccounts(data);
    }).catch(console.error);
  }

  async function getAccounts() {
    const token = await getUserToken(() => navigate('/'));

    await fetch(`/api/accounts`, {
      headers: {'Authorization': `Bearer ${token}`}
    }).then(response => response.json()
    ).then(data => {
      console.log('getAccounts response: ', data);
      setAccounts(data);
    }).catch(console.error);
  };

  return (
    <div className="payment-page">
      <h1>Make a Payment</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="user-account">Choose an Account:</label>
          <select id="user-account" name="user-account" onChange={handleAccountChange} required>
            <option value="">--Please select an account--</option>
            {accounts.map((account) => (
              <option key={account.number} value={account.number}>{account.type} - {account.number}</option>
            ))}
          </select>          
          {selectedAccount &&
            <div>
              <label htmlFor="transaction-type">Transaction Type:</label>
              <select id="transaction-type" value={transactionType} onChange={handleTransactionTypeChange}>
                <option value="">--Please select a transaction type--</option>
                <option value="withdraw">Withdraw</option>
                <option value="deposit">Deposit</option>
                <option value="transfer">Transfer</option>
              </select>
            </div>
          }
        </div>
        {selectedAccount && transactionType && <div>
          {transactionType === 'withdraw' ? (
            <div>
              <label htmlFor="amount">Amount:</label>
              <input type="text" id="amount" value={amount} onChange={handleAmountChange} />
              <label htmlFor="recipient-account-number">Recipient Account Number:</label>
              <input type="text" id="recipient-account-number" value={recipientAccountNumber} onChange={handleRecipientAccountNumberChange} />
            </div>
          ) : null}
          {transactionType === 'transfer' ? (
            <div>
              <label htmlFor="amount">Amount:</label>
              <input type="text" id="amount" value={amount} onChange={handleAmountChange} />
              <label htmlFor="recipient-routing-number">Recipient Routing Number:</label>
              <input type="text" id="recipient-routing-number" value={recipientRoutingNumber} onChange={handleRecipientRoutingNumberChange} />
              <label htmlFor="recipient-account-number">Recipient Account Number:</label>
              <input type="text" id="recipient-account-number" value={recipientAccountNumber} onChange={handleRecipientAccountNumberChange} />
              <label htmlFor="repeat-check">Repeating Transfer?</label>
              <input type="checkbox" id="repeat-check" value={repeating} onChange={() => setRepeating(!repeating)} />
              <label htmlFor="repeat-on-date">Repeat On Date:</label>
              <DatePicker id="repeat-on-date" selected={startDate} onChange={(date) => setStartDate(date)} disabled={!repeating} />
            </div>
          ) : null}
          {transactionType === 'deposit' ? (
            <div>
              <label htmlFor="amount">Amount:</label>
              <input type="text" id="amount" value={amount} onChange={handleAmountChange} />
              <label htmlFor="image1">Image 1:</label>
              <input type="file" id="image1" accept="image/*" onChange={handleImage1Change} />
              {image1 && <img src={URL.createObjectURL(image1)} alt="Image 1" />}
              <label htmlFor="image2">Image 2:</label>
              <input type="file" id="image2" accept="image/*" onChange={handleImage2Change} />
              {image2 && <img src={URL.createObjectURL(image2)} alt="Image 2" />}
            </div>
          ) : null}
          <button type="submit">Submit</button>
        </div>}
      </form>
    </div>
  );
}

export default PaymentPage