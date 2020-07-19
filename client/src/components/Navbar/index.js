import React from "react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { IoIosMenu } from "react-icons/io";
import Search from "../Search";

import "./style.css";

const NavBar = (props) => {
  return (
    <>
      <nav className="navbar navbar-expand-lg nav1">
        <div className="brand">Rubber Duck</div>
        <img src="/images/duck.jpg" height="50px" />
        <Search setSearch={props.setSearch} />
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="menu">
            <IoIosMenu />
          </span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
            <li>
              <Link to="/post-question">
                <Button variant="outline-info" className="ask-question">
                  Ask question
                </Button>
              </Link>
            </li>
            <li>
              <Link to="/">
                <Button variant="link" className="home">
                  Home
                </Button>
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};
export default NavBar;
