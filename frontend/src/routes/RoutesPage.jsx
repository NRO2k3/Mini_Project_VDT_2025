import React from 'react'
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import AuthRoute from '../components/AuthRoute';
import DashboardSaving from '../pages/DashboardSaving';
import Savings from '../pages/Savings';
import Page from '../pages/configuration/Page';
import Customer from '../pages/configuration/Customer';

function RoutesPage() {
  return (
    <Routes>
      <Route
          path="/login"
          element={
            <AuthRoute authRequired={false}>
              <Login />
            </AuthRoute>}
      />

      <Route
          path="/signup"
          element={
            <AuthRoute authRequired={false}>
              <Signup />
            </AuthRoute>}
      />

      <Route
          path="/"
          element={
            <AuthRoute authRequired={true}>
              <Home />
            </AuthRoute>
          }
      />

      <Route
          path="/home"
          element={
            <AuthRoute authRequired={true}>
              <Home />
            </AuthRoute>
          }
      />

      <Route
        path="/saving"
        element={
          <AuthRoute authRequired={true}>
            <Savings/>
          </AuthRoute>
        }
      />
      <Route
        path="/saving/dashboard"
        element={
          <AuthRoute authRequired={true}>
            <DashboardSaving/>
          </AuthRoute>
        }
      />
      <Route
        path="/configuration/page"
        element={
          <AuthRoute authRequired={true}>
            <Page/>
          </AuthRoute>
        }
      />
      <Route
        path="/configuration/customer"
        element={
          <AuthRoute authRequired={true}>
            <Customer/>
          </AuthRoute>
        }
      />
    </Routes>

    
  );
}

export default RoutesPage