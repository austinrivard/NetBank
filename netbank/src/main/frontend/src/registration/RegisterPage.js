import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './register.css';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'
import { getValidatedUser } from '../firebase';

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    street: '',
    city: '',
    state: '',
    zipcode: '',
    email: '',
    phoneNumber: '',
    ssn: '',
    password: ''
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  async function registerUser(user) {
    const token = await user.getIdToken();
    const uid = user.uid;
    await fetch('/api/user', {
      method: 'POST',
      headers: {'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json'},
      body: JSON.stringify({ uid, ...formData })
    }).then(response => response.json()
    ).then(data => {
      console.log('registerUser response: ', data);
    }).catch(console.error);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    await createUserWithEmailAndPassword(getAuth(), formData.email, formData.password)
      .then((userCredential) => {
        // Signed in 
        registerUser(userCredential.user);
      }).catch(console.log);
    navigate('/dashboard');
  };

  return (
    <div className="reg-container">
      <div className="register">
        <form className="register-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="firstName">First Name:</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="lastName">Last Name:</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="street">Street Address:</label>
            <input
              type="text"
              id="street"
              name="street"
              value={formData.street}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="city">City:</label>
            <input
              type="text"
              id="city"
              name="city"
              value={formData.city}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="middleName">State:</label>
            <input
              type="text"
              id="state"
              name="state"
              value={formData.state}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="zipcode">Zip Code:</label>
            <input
              type="text"
              id="zipcode"
              name="zipcode"
              value={formData.middleName}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="phoneNumber">Phone Number:</label>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="ssn">SSN:</label>
            <input
              type="text"
              id="ssn"
              name="ssn"
              value={formData.ssn}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
          </div>
          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  );
}

export default Register;