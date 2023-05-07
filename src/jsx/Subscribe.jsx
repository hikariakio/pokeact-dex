import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { GIF } from "./GIF";
import { Button } from "@mui/material";

export function Subscribe() {
  useEffect(() => {
    document.title = "Subscribe";
    document.querySelector(
      "link[rel~='icon']"
    ).href = require(`../assets/misc/small_pokeball.png`);
  }, []);

  const navigate = useNavigate(); // useNavigate hook to programmatically navigate

  const [email, setEmail] = useState("");
  const [statusMsg, setStatusMsg] = useState("");

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = emailPattern.test(email);
    if (!isValid) {
      if (email === "") setStatusMsg("Please fill out this field.");
      else setStatusMsg("Your email is not valid.");
    } else {
      setEmail("");
      setStatusMsg("❤️ Thank you for subscribing.");
      setTimeout(() => navigate(`/pokeact-dex/`), 2000);
    }
    setTimeout(() => setStatusMsg(""), 2000);
  };

  return (
    <div className="subscribe-container">
      <div className="center subscribe-box">
        <GIF gifName="rowlet_subscribe" />
        <div className="subscribe-text">
          <h4> Subscribe </h4>
          <p> This is only for the assignment purpose.</p>
          <div className="subscribe-form">
            <input
              type="email"
              placeholder="xxx@email.com"
              value={email}
              onChange={handleChange}
            />
            {/*<Button onClick={handleSubmit} > >> </Button>*/}
            <button onClick={handleSubmit}>
              <span className="line"></span>
              <span>❤</span>️
            </button>
            <p className={"subscribe-status"}>{statusMsg}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
