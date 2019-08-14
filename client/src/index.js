import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route } from 'react-router-dom';
import axios from 'axios';

import { ProfileProvider } from './state/Profile.store';
import { AuthContextProvider } from './state/GlobalAuthContext';


import NavBar from './components/layout/NavBar';
import Landing from './components/layout/Landing';
import Footer from './components/layout/Footer';
import Developers from './components/layout/Developers';
import ProfileView from './components/Profile/ProfileView';
import Dashboard from './components/dashboard/Dashboard';
import PostsFeed from './components/posts/PostsFeed';
import Post from './components/post/Post'
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import CreateProfile from './components/create-profile/CreateProfile';
import EditProfile from './components/edit-profile/EditProfile';
import AddExperience from './components/create-profile/AddExperience';
import AddEducation from './components/create-profile/AddEducation';
import PrivateRoute from './components/common/PrivateRoute';
import ErrorMessage from './components/common/ErrorMessage';

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
            <Route path="/profiles" exact component={Developers} />
            <Route path="/profile/:handle" exact component={ProfileView} />
            <PrivateRoute path="/dashboard" exact component={Dashboard} />
            <PrivateRoute path="/feed" exact component={PostsFeed} />
            <PrivateRoute path="/post/:post_id" exact component={Post} />
            <PrivateRoute path="/create-profile" exact component={CreateProfile} />
            <PrivateRoute path="/edit-profile" exact component={EditProfile} />
            <PrivateRoute path="/add-experience" exact component={AddExperience} />
            <PrivateRoute path="/add-education" exact component={AddEducation} />
            <Route path="/error-page" exact component={ErrorMessage} />
          </div>
          <Footer />
        </AuthContextProvider>
      </ProfileProvider>
    </Router>
  );
}


const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
