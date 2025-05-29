import React from 'react'
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Configuration from '../pages/Configuration';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import AuthRoute from '../components/AuthRoute';
import DashboardSaving from '../pages/DashboardSaving';
import Savings from '../pages/Savings';


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
        path="/configuration"
        element={
          <AuthRoute authRequired={true}>
            <Configuration />
          </AuthRoute>
        }
      />
    </Routes>
  );
}

export default RoutesPage