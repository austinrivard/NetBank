
import React, { useState } from 'react';
import './payment.css'
function PaymentPage() {
  const [recipientRoutingNumber, setRecipientRoutingNumber] = useState('');
  const [recipientAccountNumber, setRecipientAccountNumber] = useState('');
  const [amount, setAmount] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle payment submission logic here
  };
  return (
    <div className="payment-page">
      <h1>Make a Payment</h1>
      <form onSubmit={handleSubmit} className="payment-form">
        <label htmlFor="recipient-routing-number">Recipient Routing Number:</label>
        <input
          id="recipient-routing-number"
          type="text"
          pattern="\d{9}"
          value={recipientRoutingNumber}
          onChange={(e) => setRecipientRoutingNumber(e.target.value)}
          required
        />
        <label htmlFor="recipient-account-number">Recipient Account Number:</label>
        <input
          id="recipient-account-number"
          type="text"
          pattern="\d{10}"
          value={recipientAccountNumber}
          onChange={(e) => setRecipientAccountNumber(e.target.value)}
          required
        />
        <label htmlFor="amount">Amount:</label>
        <input
          id="amount"
          type="number"
          min="0.01"
          step="0.01"
          value={amount}
          onChange={(e) => setAmount(parseFloat(e.target.value))}
          required
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default PaymentPage;