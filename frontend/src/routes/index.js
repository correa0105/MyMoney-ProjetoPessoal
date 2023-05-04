import React from 'react';
import { Routes, Route } from 'react-router-dom';

import PrivateRoute from './PrivateRoute';

import Login from '../pages/Login';
import Home from '../pages/Home';
import AccountsCreate from '../pages/AccountsCreate';
import Dashboard from '../pages/Dashboard';
import ExpenseType from '../pages/ExpenseType';
import ExpensePeriod from '../pages/ExpensesPeriod';

export default function ContainerRoutes() {
  return (
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route exact path="/dashboard" element={<Dashboard />} />
      <Route exact path="/login" element={<Login />} />
      <Route
        exact
        path="/accounts/create"
        element={
          <PrivateRoute>
            <AccountsCreate />
          </PrivateRoute>
        }
      />
      <Route
        exact
        path="/expensetype"
        element={
          <PrivateRoute>
            <ExpenseType />
          </PrivateRoute>
        }
      />
      <Route
        exact
        path="/expenseperiod"
        element={
          <PrivateRoute>
            <ExpensePeriod />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}
