import React from 'react'
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import AuthRoute from '../components/AuthRoute';
import Page from '../pages/configuration/Page';
import LandingProduct from '../pages/LandingProduct';
import DashboardProduct from '../pages/DashboardProduct';

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
                <Login />
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
        path="/product/landing"
        element={
          <AuthRoute authRequired={true}>
            <LandingProduct/>
          </AuthRoute>
        }
      />
      <Route
        path="/product/dashboard"
        element={
          <AuthRoute authRequired={true}>
            <DashboardProduct/>
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
    </Routes>

    
  );
}

export default RoutesPage