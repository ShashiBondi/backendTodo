import React, { useState } from "react";
import "./User.css";
import { useNavigate } from "react-router-dom";
import auth from "../FirebaseConfig";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import axios from "axios";
import { Link } from "react-router-dom";
import logo from "../logo.png";
const userApi = axios.create({
  baseURL: "http://localhost:9999/",
});
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

  async function addButtonClick() {
    let response;
    try {
      response = await createUserWithEmailAndPassword(auth, email, password);
      const { user } = response;
      await updateProfile(user, { displayName: userName });
      await userApi.post(`users`, {
        userId: response.user.uid,
        name: userName,
        email: email,
      });
      setUserName("");
      setEmail("");
      setPassword("");
      navigate("/login");
    } catch (error) {
      window.alert(error.message);
    }
  }

  return (
    <div className="register-page">
      <div className="user-container">
        <div>
          <img src={logo} alt="Logo" className="homepage-logo" />
        </div>
        <div className="registerpageheader"> Welcome to To-do!</div>

        <input
          type="text"
          placeholder=" Name"
          value={userName}
          onChange={handleInputName}
        />

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

        <button onClick={addButtonClick}>SignUp</button>
      </div>
    </div>
  );
}
