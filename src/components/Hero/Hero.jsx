import React from "react";
import styles from "./Hero.module.css";
import headphones from "../../../assets/headphones_1.svg";

function Hero() {
  return (
    <div className={styles.hero}>
      <h1>100 Thousand Songs, ad-free</h1>
      <img src={headphones} alt="headphones" />
    </div>
  );
}

export default Hero;