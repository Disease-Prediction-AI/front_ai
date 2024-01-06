import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useLocalState } from "../../utils/localStorage/CustomLocalStorage";

const PrivateRoute = ({ children }) => {
  const [jwt, setJwt] = useLocalState("", "jwt");

 
  return jwt? children:<Navigate to="/"/>;
};

export default PrivateRoute;
