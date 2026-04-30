import React from "react";
import logo from "../../../assets/logo.svg";

function Logo() {
  return (
    <div className="logo-container">
      <img
        src={logo}
        alt="logo"
        className="logo"
        style={{ marginLeft: "8px" }}
      />
    </div>
  );
}

export default Logo;