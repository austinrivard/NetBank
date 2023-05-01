import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleClick = () => {
    signInWithEmailAndPassword(getAuth(), email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        const uid = userCredential.user.uid;
        
        // attach bearer token here somehow?
        navigate('/dashboard');
      })
      .catch((error) => console.log);
  };

  return (
    <div className="login">
      <div className="login-container">
        <Input label="Username" name="username" value={email} onChange={setEmail} />
        <Input label="Password" type="password" name="password" value={password} onChange={setPassword} />
        <Button label="Login" onClick={handleClick} />
      </div>
    </div>
  );
};

const Input = ({ label, type = 'text', name, value, onChange }) => {
  return (
    <div className="input-container">
      <label htmlFor={name}>{label}</label>
      <input type={type} name={name} value={value} onChange={e => onChange(e.target.value)} />
    </div>
  );
};

const Button = ({ label, onClick }) => {
  return (
    <button className="button" onClick={onClick}>
      <Text value={label} />
    </button>
  );
};

const Text = ({ value }) => {
  return <span>{value}</span>;
};

export default Login;
