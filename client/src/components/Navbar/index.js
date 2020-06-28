import React from "react";
import { Link } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import "./style.css";

const NavBar = () => {
  return (
    <>
      <Navbar className="navb" bg="dark" variant="dark">
        <Navbar.Brand className="brand">Coding Forum</Navbar.Brand>
        <Nav className="mr-auto"></Nav>

        <Form inline>
          <FormControl type="text" placeholder="Search" className="mr-sm-2" />
          <Link to="/post-question">
            <Button variant="outline-info" className="ask-question">
              Ask question
            </Button>
          </Link>
        </Form>
      </Navbar>
    </>
  );
};
export default NavBar;
