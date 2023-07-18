import React, { useState } from "react";
import "./UserRegister.css";
import { useNavigate } from "react-router-dom";
import auth from "../FirebaseConfig";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import axios from "axios";
import { Link } from "react-router-dom";
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
  //   const handleLoginButtonClick = () => {
  //     navigate("/login");
  //   };
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
            placeholder="Enter your Email"
            value={email}
            onChange={handleInputEmail}
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Enter your Your Password"
            value={password}
            onChange={handleInputPassword}
          />
          <div className="footer-button">
            <div>
              <button onClick={addButtonClick}>SignUp</button>
            </div>
            <div>
              {/* <button onClick={handleLoginButtonClick}>Login</button> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
