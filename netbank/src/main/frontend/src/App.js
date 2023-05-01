import React from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Front from './front/FrontPage';
import Login from './login/LoginPage';
import Register from './registration/RegisterPage';
import Dashboard from './dashboard/Dashboard';

import Pay from './payment/Payment';
import Transaction from './transaction/Transaction';
import Statement from './statement/Statement';
import Open from './open/Open';
import Map from './maps/MapPage';


import './index.css';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Front />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/payments" element={<Pay />} />
        <Route path="/dashboard/transactions" element={<Transaction />} />
        <Route path="/dashboard/statements" element={<Statement />} />
        <Route path="/dashboard/new-account" element={<Open />} />
        <Route path="/dashboard/maps" element={<Map />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}
