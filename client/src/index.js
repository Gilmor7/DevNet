import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';

import NavBar from './components/layout/NavBar';
import Landing from './components/layout/Landing';
import Footer from './components/layout/Footer';
import Register from './components/auth/Register';
import Login from './components/auth/Login';

axios.defaults.baseURL = "http://localhost:5000";


function App() {
  return (
    <Router>
      <Container>
        <NavBar />
        <Route path="/" exact component={Landing} />
        <div className="container">
          <Route path="/Login" exact component={Login} />
          <Route path="/Register" exact component={Register} />
        </div>
        <Footer />
      </Container>
    </Router>
  );
}

const Container = styled.div`
.landing {
  position: relative;
  background: url('./img/showcase.jpg') no-repeat;
  background-size: cover;
  background-position: center;
  height: 100vh;
  margin-top: -24px;
  margin-bottom: -50px;
}

.landing-inner {
  padding-top: 80px;
}

.dark-overlay {
  background-color: rgba(0, 0, 0, 0.7);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.card-form {
  opacity: 0.9;
}

.latest-profiles-img {
  width: 40px;
  height: 40px;
}

.form-control::placeholder {
  color: #bbb !important;
}
img{
  width:100%;
}
`;

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
