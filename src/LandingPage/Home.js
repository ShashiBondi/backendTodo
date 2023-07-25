import React from "react";
import "./Home.css";
import logo from "../logo.png";
import { useNavigate } from "react-router";
import Typical from "react-typical";
function Home() {
  const navigate = useNavigate();
  function handleButtonClick() {
    navigate("/login");
  }
  return (
    <div className="homepage-container">
      <div className="homepage">
        <div>
          <img src={logo} alt="Logo" className="homepage-logo" />
        </div>
        <h1 className="homepage-title">
          A better{" "}
          <span>
            <Typical
              steps={[
                "to-do list",
                3500,
                "",
                1000,
                "a personalised task manager",
              ]}
              loop={Infinity}
            />{" "}
          </span>
          for work
        </h1>
        <div className="homepage-description">
          Say goodbye to handwritten to-do lists with missing details, and say
          hello to having all the information you need to get your tasks done.
        </div>
        <div>
          <button className="get-started-btn" onClick={handleButtonClick}>
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;
