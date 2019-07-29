import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route } from 'react-router-dom';


import axios from 'axios';

import { ProfileProvider } from './state/Profile.store';
import { AuthContextProvider } from './state/GlobalAuthContext';

import NavBar from './components/layout/NavBar';
import Landing from './components/layout/Landing';
import Footer from './components/layout/Footer';
import Dashboard from './components/dashboard/Dashboard';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import CreateProfile from './components/create-profile/CreateProfile';
import EditProfile from './components/edit-profile/EditProfile';
import PrivateRoute from './components/common/PrivateRoute';

import './styles.css';

axios.defaults.baseURL = "http://localhost:5000";


function App() {

  return (
    <Router>
      <ProfileProvider>
        <AuthContextProvider>
          <NavBar />
          <Route path="/" exact component={Landing} />
          <div className="container">
            <Route path="/Login" exact component={Login} />
            <Route path="/Register" exact component={Register} />
            <PrivateRoute path="/dashboard" exact component={Dashboard} />
            <PrivateRoute path="/create-profile" exact component={CreateProfile} />
            <PrivateRoute path="/edit-profile" exact component={EditProfile} />
          </div>
          <Footer />
        </AuthContextProvider>
      </ProfileProvider>
    </Router>
  );
}


const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
