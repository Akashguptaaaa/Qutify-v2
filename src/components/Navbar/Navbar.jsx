import React from "react";
import { Link, useInRouterContext } from "react-router-dom";
import Button from "../Button/Button";
import Logo from "../Logo/Logo";
import Search from "../Search/Search";
import styles from "./Navbar.module.css";

function Navbar({ searchData }) {
  const isInRouter = useInRouterContext();

  return (
    <nav className={`navbar ${styles.navbar}`} data-testid="navbar">
      {isInRouter ? (
        <Link to="/">
          <Logo />
        </Link>
      ) : (
        <Logo />
      )}
      <Search placeholder="search a song" searchData={searchData} />
      <Button>Give Feedback</Button>
    </nav>
  );
}

export default Navbar;