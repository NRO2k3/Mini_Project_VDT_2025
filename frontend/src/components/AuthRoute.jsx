import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { ParamContext } from "../App";

function AuthRoute({ children, authRequired }) {
  const { isSignIn } = useContext(ParamContext);

  if (authRequired && !isSignIn) {
    return <Navigate to="/login" replace />;
  }

  if (!authRequired && isSignIn) {
    return <Navigate to="/login" replace />;
  }

  if (!authRequired && isSignIn) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default AuthRoute;