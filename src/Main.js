import React from "react";
import { Link } from "react-router-dom";
import "./Main.css";

export default function Main() {
  return (
    <div className="main-container">
      <div className="main-title">Welcome to the ToDo App</div>
      <div className="link-container">
        <Link to="/login">Login</Link>
      </div>
      <div className="link-container">
        Don't have an account? <Link to="/register">Create One</Link>
      </div>
    </div>
  );
}
