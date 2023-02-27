import React, { useState } from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Dropdown from 'react-bootstrap/Dropdown';
import axios from "axios";
import {useEffect} from "react";
import './Header.css';

const LOGOUT_URL = `http://localhost:8000/dj-rest-auth/logout/`;

const Header = () => {

  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  const handleLogout = () => {
    fetchLogoutApi();
  }

  const fetchLogoutApi = async () => {
    const response = await axios.post(LOGOUT_URL)
      .catch((error) => {
        console.log(error);
      })
    localStorage.removeItem("user");
  }

/*   useEffect (() => {
    const userInfo = async () => {
      setUser(JSON.parse(localStorage.getItem("user")));
      console.log(user)
    };
    userInfo();
  }, []) */


  return (
    <>
      {window.location.pathname !== "/" ?
        <Navbar bg="primary" variant="dark" className="navbar-container">
          <Container>
            <Navbar.Brand href="#home">Navbar</Navbar.Brand>
            <Nav className="me-auto">
              <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link href="#features">Features</Nav.Link>
              <Nav.Link href="#pricing">Pricing</Nav.Link>
            </Nav>
            <Nav className="d-flex">
              <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic" >
                  {user.username}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item href="/" onClick={() => handleLogout()} >Logout</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Nav>
          </Container>
        </Navbar>
        : null}
    </>
  );
};

export default Header;