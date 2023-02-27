import React, { useState } from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Dropdown from 'react-bootstrap/Dropdown';
import axios from "axios";
import './Header.css';
import { useDispatch } from "react-redux";
import { filterTicketsByStatus } from "../../redux/actions/ticketActions";

const LOGOUT_URL = `http://localhost:8000/dj-rest-auth/logout/`;

const Header = () => {

  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  const dispatch = useDispatch();

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

  const handleOnClick = (key) => {
    dispatch(filterTicketsByStatus(key));
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

              <NavDropdown
                id="nav-dropdown-dark-example"
                title="Filter By status"
                menuVariant="dark"
              >
                <NavDropdown.Item as="button" onClick={() => handleOnClick(0)}>
                  All
                </NavDropdown.Item>

                <NavDropdown.Item as="button" onClick={() => handleOnClick(1)}>
                  Created
                </NavDropdown.Item>

                <NavDropdown.Item as="button" onClick={() => handleOnClick(2)}>
                  Assigned
                </NavDropdown.Item>
              
                <NavDropdown.Item as="button" onClick={() => handleOnClick(3)}>
                  Closed
                </NavDropdown.Item>
              </NavDropdown>

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