import React, { useState } from 'react';
import './open.css'
function InputText(props) {
  return (
    <div className="form-group">
      <label htmlFor={props.name}>{props.label}</label>
      <input
        id={props.name}
        name={props.name}
        type={props.type}
        value={props.value}
        onChange={(e) => props.onChange(e.target.value)}
      />
    </div>
  );
}

function Button(props) {
  return (
    <button type={props.type} className="btn" onClick={props.onClick}>
      {props.label}
    </button>
  );
}

function OpenAccount(props) {
  const [ssn, setSsn] = useState('');

  const handleSsnChange = (value) => {
    setSsn(value);
  };

  const handleOpenAccount = () => {
    // handle opening the account here
  };

  return (
    <div className="OpenAccount">
      <h1>Open an Account</h1>
      <div className="form">
        <InputText label="Social Security Number" name="ssn" type="text" value={ssn} onChange={handleSsnChange} />
        <Button label="Open Account" onClick={handleOpenAccount} />
      </div>
    </div>
  );
}

export default OpenAccount;