// import logo from "./logo.svg";

// import "./App.css";
// import TodoApp from "./Todo/TodoApp";
// import UserRegister from "./User/UserRegister";

// function App() {
//   return (
//     <div className="App">
//       {/* <TodoApp /> */}
//       <UserRegister />
//     </div>
//   );
// }

// export default App;
import React from "react";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";

import UserRegister from "./User/UserRegister";

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
