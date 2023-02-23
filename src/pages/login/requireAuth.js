

import { Navigate } from "react-router-dom";
import React, { useState, useEffect, useRef } from "react";

const RequireAuth = ({isLogged, children}) => {

 const token = localStorage.getItem("token")
  
  if(token){

     isLogged = true
  }else{
      isLogged = false
  }
  if (!isLogged) {

    return <Navigate to="/login" />
    }
    
    return children
    };

  export default RequireAuth;