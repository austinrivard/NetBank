import React, { useState } from 'react';
import './payment.css';
function PaymentPage() {
  const [transactionType, setTransactionType] = useState('withdraw');
  const [amount, setAmount] = useState('');
  const [recipient, setRecipient] = useState('');
  const [accountNumber, setAccountNumber] = useState('');

  const handleTransactionTypeChange = (e) => {
    setTransactionType(e.target.value);
  };

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const handleRecipientChange = (e) => {
    setRecipient(e.target.value);
  };

  const handleAccountNumberChange = (e) => {
    setAccountNumber(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
  };

  return (
    <div className="payment-page">
      <h1>Make a Payment</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="transaction-type">Transaction Type:</label>
          <select id="transaction-type" value={transactionType} onChange={handleTransactionTypeChange}>
            <option value="withdraw">Withdraw</option>
            <option value="deposit">Deposit</option>
            <option value="transfer">Transfer</option>
            <option value="pay">Pay</option>
          </select>
        </div>
        <div>
          <label htmlFor="amount">Amount:</label>
          <input type="text" id="amount" value={amount} onChange={handleAmountChange} />
        </div>
        {transactionType === 'transfer' || transactionType === 'pay' ? (
          <div>
            <label htmlFor="recipient">Recipient:</label>
            <input type="text" id="recipient" value={recipient} onChange={handleRecipientChange} />
          </div>
        ) : null}
        {transactionType === 'transfer' ? (
          <div>
            <label htmlFor="account-number">Account Number:</label>
            <input type="text" id="account-number" value={accountNumber} onChange={handleAccountNumberChange} />
          </div>
        ) : null}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default PaymentPage;