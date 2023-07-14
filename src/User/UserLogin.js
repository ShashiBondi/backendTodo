import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./UserLogin.css";

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
  function addButtonClick() {
    navigate("/todos");
  }
  return (
    <div className="user-container">
      <div>
        <h1>User Login</h1>

        <div>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={handleInputEmail}
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Enter your Your password"
            value={password}
            onChange={handleInputPassword}
          />
          <div>
            <button onClick={addButtonClick}>LOGIN</button>
          </div>
        </div>
      </div>
    </div>
  );
}
