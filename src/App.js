import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import UserRegister from "./User/UserRegister";
import "./App.css";
import UserLogin from "./User/UserLogin";
import TodoApp from "./Todo/TodoApp";
import Home from "./LandingPage/Home";

const App = () => {
  return (
    <div>
      <Router>
        <div>
          <Routes>
            <Route exact path="/login" Component={UserLogin}></Route>
            <Route exact path="/register" Component={UserRegister}></Route>
            <Route exact path="/todos" Component={TodoApp}></Route>
            <Route exact path="" Component={Home}></Route>
          </Routes>
        </div>
      </Router>
    </div>
  );
};

export default App;
