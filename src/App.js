import { Route, BrowserRouter } from "react-router-dom";
import {React, useState} from 'react';
import Home from "./pages/index";
import Applicants from "./pages/Table";
import ProtectedRoute from "./pages/ProtectedRoute";
import AuthenticationForm from "./AuthenticationForm";
import ApplicationClosed from "./pages/ApplicationClosed";



export default function App() {
  const [isAuth, setIsAuth] = useState(true);

  debugger
  return (
    
          <div
      style={{
        overflowY: "auto",
        overflowX: "hidden"
      }}
    >
      <AuthenticationForm  isAuth = {isAuth} setIsAuth = {setIsAuth}/>
      <BrowserRouter>
        <Route path="/" exact component={Home} />
        <ProtectedRoute path="/applicants" component={Applicants} isAuth = {isAuth}/>
        <Route path="/applicationClosed" exact component={ApplicationClosed} />
      </BrowserRouter>
    </div>
  
  );
}