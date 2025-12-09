import React from 'react'
import { Navigate } from 'react-router-dom'
function ProtectedRoute({children}) {
   let name=sessionStorage.getItem('name');
   if(!name){
    return  <Navigate to="/" replace />;
   }
    return children;
}

export default ProtectedRoute