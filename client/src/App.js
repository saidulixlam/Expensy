import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Signup from './components/Signup';
import ExpenseForm from './components/expenses/ExpenseForm';
import Forget from './components/ForgetPasswordForm';
import './App.css';
import ResetForm from './components/Reset.js';
import Premium from './components/premium/Premium.js';
import PremiumDetails from './components/premium/PremiumDetails.js';
const App = () => {

  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Signup />} />
        <Route exact path="/expense" element={<ExpenseForm />} />
        <Route exact path="/forget-passowrd" element={<Forget/>} />
        <Route exact path="/reset-password/:token" element={<ResetForm/>} />
        <Route exact path="/premium" element={<Premium />} />
        <Route exact path="/premium-card" element ={<PremiumDetails/>} />
      </Routes>
    </Router>
  );
};

export default App;
