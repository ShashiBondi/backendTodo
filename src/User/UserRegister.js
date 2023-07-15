import React, { useState } from "react";
import "./UserRegister.css";
import { useNavigate } from "react-router-dom";

export default function UserRegister() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  function handleInputName(event) {
    setUserName(event.target.value);
  }
  function handleInputEmail(event) {
    setEmail(event.target.value);
  }
  function handleInputPassword(event) {
    setPassword(event.target.value);
  }
  function addButtonClick() {
    setUserName("");
    setEmail("");
    setPassword("");
    navigate("/login");
  }
  return (
    <div>
      <div className="user-container">
        <h1>User SignUp</h1>
        <div>
          <input
            type="text"
            placeholder="Enter your Name"
            value={userName}
            onChange={handleInputName}
          />
        </div>
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
            <button onClick={addButtonClick}>SIGNUP</button>
          </div>
        </div>
      </div>
    </div>
  );
}
