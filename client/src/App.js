import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Signup from './components/Signup';
import ExpenseForm from './components/expenses/ExpenseForm';
import Forget from './components/ForgetPasswordForm';
import './App.css';
import ResetForm from './components/Reset.js';
const App = () => {

  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Signup />} />
        <Route exact path="/expense" element={<ExpenseForm />} />
        <Route exact path="/forget-passowrd" element={<Forget/>} />
        <Route exact path="/reset-password/:token" element={<ResetForm/>} />
      </Routes>
    </Router>
  );
};

export default App;
