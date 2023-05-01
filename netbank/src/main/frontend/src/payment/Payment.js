import React, { useState } from 'react';
import './payment.css';

function PaymentPage() {
  const [transactionType, setTransactionType] = useState('withdraw');
  const [amount, setAmount] = useState('');
  const [recipientRoutingNumber, setRecipientRoutingNumber] = useState('');
  const [recipientAccountNumber, setRecipientAccountNumber] = useState('');
  const [userAccountNumber, setUserAccountNumber] = useState('');
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);

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
          </select>
        </div>
        {transactionType === 'withdraw' ? (
          <div>
            <label htmlFor="amount">Amount:</label>
            <input type="text" id="amount" value={amount} onChange={handleAmountChange} />
            <label htmlFor="user-account-number">Your Account Number:</label>
            <input type="text" id="user-account-number" value={userAccountNumber} onChange={handleUserAccountNumberChange} />            
            <label htmlFor="recipient-account-number">Recipient Account Number:</label>
            <input type="text" id="recipient-account-number" value={recipientAccountNumber} onChange={handleRecipientAccountNumberChange} />
          </div>
        ) : null}
        {transactionType === 'transfer' ? (
          <div>
            <label htmlFor="amount">Amount:</label>
            <input type="text" id="amount" value={amount} onChange={handleAmountChange} />
            <label htmlFor="user-account-number">Your Account Number:</label>
            <input type="text" id="user-account-number" value={userAccountNumber} onChange={handleUserAccountNumberChange} />
            <label htmlFor="recipient-routing-number">Recipient Routing Number:</label>
            <input type="text" id="recipient-routing-number" value={recipientRoutingNumber} onChange={handleRecipientRoutingNumberChange} />
            <label htmlFor="recipient-account-number">Recipient Account Number:</label>
            <input type="text" id="recipient-account-number" value={recipientAccountNumber} onChange={handleRecipientAccountNumberChange} />
          </div>
        ) : null}
        {transactionType === 'deposit' ? (
          <div>
            <label htmlFor="amount">Amount:</label>
            <input type="text" id="amount" value={amount} onChange={handleAmountChange} />
            <label htmlFor="user-account-number">Your Account Number:</label>
            <input type="text" id="user-account-number" value={userAccountNumber} onChange={handleUserAccountNumberChange} />
            <label htmlFor="image1">Image 1:</label>
            <input type="file" id="image1" accept="image/*" onChange={handleImage1Change} />
            {image1 && <img src={URL.createObjectURL(image1)} alt="Image 1" />}

            <label htmlFor="image2">Image 2:</label>
            <input type="file" id="image2" accept="image/*" onChange={handleImage2Change} />
            {image2 && <img src={URL.createObjectURL(image2)} alt="Image 2" />}
          </div>
        ) : null}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default PaymentPage