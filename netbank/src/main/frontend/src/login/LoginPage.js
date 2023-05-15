import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [badLogins, setBadLogins] = useState(false);

  const handleClick = async (event) => {
    try {
      const userCredential = await signInWithEmailAndPassword(getAuth(), email, password)
      const user = userCredential.user;
      const uid = userCredential.user.uid;
      const token = await userCredential.user.getIdToken();
      const isAdmin = await getUserRole(token);
      setBadLogins(false);
      if(isAdmin){
        navigate('/admin');
      }else{
        navigate('/dashboard');
      }
      console.log(userCredential);
    } catch (error) {
      setBadLogins(true);
      console.error(error);
    }
  };

  const getUserRole = async (token) => {
    const response = await fetch('/api/user/role', {
      method: 'GET',
      headers: {'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json'}
    });
    const data = await response.json();
    return data;
  };

  return (
    <div className="login">
      <div className="login-container">
        <Input label="Username" name="username" value={email} onChange={setEmail} />
        <Input label="Password" type="password" name="password" value={password} onChange={setPassword} />
        {badLogins && <div className="error">Wrong username and password combo</div> }
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
