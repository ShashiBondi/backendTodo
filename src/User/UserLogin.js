import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./User.css";
import { signInWithEmailAndPassword } from "firebase/auth";
import auth from "../FirebaseConfig";
import logo from "../logo.png";

export default function UserLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  function handleInputEmail(event) {
    setEmail(event.target.value);
  }

  function handleInputPassword(event) {
    setPassword(event.target.value);
  }

  async function addButtonClick() {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setEmail("");
      setPassword("");
      navigate("/todos");
    } catch (error) {
      window.alert(error.message);
    }
  }

  return (
    <div className="login-page">
      <div className="user-container">
        <div>
          <img src={logo} alt="Logo" className="homepage-logo" />
        </div>
        <div className="loginpageheader"> Welcome to To-do!</div>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={handleInputEmail}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={handleInputPassword}
        />

        <button onClick={addButtonClick}>Login</button>

        <div>
          Don't have an account?{" "}
          <Link to="/register" className="link-text">
            SignUp
          </Link>
        </div>
      </div>
    </div>
  );
}
