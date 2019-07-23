import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route } from 'react-router-dom';


import axios from 'axios';

// import { AuthContextProvider } from './state/Auth.Context';
import { AuthContextProvider } from './state/GlobalAuthContext';

import NavBar from './components/layout/NavBar';
import Landing from './components/layout/Landing';
import Footer from './components/layout/Footer';
import Profiles from './components/layout/Profiles';
import Register from './components/auth/Register';
import Login from './components/auth/Login';

import './styles.css';

axios.defaults.baseURL = "http://localhost:5000";


function App() {

  return (
    <Router>
      <AuthContextProvider>
        <NavBar />
        <Route path="/" exact component={Landing} />
        <div className="container">
          <Route path="/Login" exact component={Login} />
          <Route path="/Register" exact component={Register} />
          <Route path="/profiles" exact component={Profiles} />
        </div>
        <Footer />
      </AuthContextProvider>
    </Router>
  );
}


const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
