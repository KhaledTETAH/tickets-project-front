import React, { useEffect, useState } from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Dropdown from 'react-bootstrap/Dropdown';
import axios from "axios";
import './Header.css';
import { useDispatch, useSelector } from "react-redux";
import { LOGOUT_URL, USER_NOTIFICATIONS_URL, TICKETS_URL, NOTIFICATIONS_URL } from "../Utils/ConfigApi";
import { filterTicketsByStatus, filteringTickets, removeSelectedTicket, getUserNotifications, selectTicket, readNotification, filterTicketsByMyTicketsFr, filterTicketsByMyTicketsDz } from "../../redux/actions/ticketActions";
import { formatDate1 } from "../Utils/FormatDate1";
import { useNavigate } from "react-router-dom";


const Header = () => {

  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const userNotifications = useSelector((state) => state.notificationReducer.notifications);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  /* display the add form */
  const goToAddTicketForm = () => {
    dispatch(removeSelectedTicket());
  };

  const getNonReadNotification = () => {
    return userNotifications.filter(notif => notif.read === false).length;
  }

  const handleGetMyTickets = () => {
    if(user.groups.includes(1)){
      dispatch(filteringTickets(true));
      dispatch(filterTicketsByMyTicketsFr(user.id));
    };

    if(user.groups.includes(2)){
      dispatch(filteringTickets(true));
      dispatch(filterTicketsByMyTicketsDz(user.id));
    }

  }

  const handleLogout = () => {
    fetchLogoutApi();
    setTimeout(() => {
      navigate("/");
    }, 2000);
  };

  const fetchLogoutApi = async () => {
    const response = await axios.post(LOGOUT_URL)
      .catch((error) => {
        console.log(error);
      })
    localStorage.removeItem("user");
  };

  const handleOnClick = (key) => {
    if (key === 0) {
      dispatch(filteringTickets(false));
    } else {
      dispatch(filteringTickets(true));
      dispatch(filterTicketsByStatus(key));
    };
  };

  const handleShowNotifications = async (ticketId, notifId) => {
    const response = await axios.get(TICKETS_URL + ticketId)
      .catch((error) => {
        console.log(error)
      });

    const res = await axios.patch(NOTIFICATIONS_URL + notifId + "/", { read: true })
      .catch((error) => {
        console.log(error);
      });

    dispatch(selectTicket(response.data));
    dispatch(readNotification(notifId));
  };

  const fetchUserNotifications = async (userId) => {
    const response = await axios.get(USER_NOTIFICATIONS_URL + userId)
      .catch((error) => {
        console.log(error);
      });
    dispatch(getUserNotifications(response.data));
  };

  useEffect(() => {
    fetchUserNotifications(user.id);
  }, []);

  return (
    <>
      {window.location.pathname !== "/#" ?
        <Navbar bg="primary" variant="dark" className="navbar-container"
         style={{ position: "fixed", top: 0, width: "100%", background: "white", zIndex: 1,marginBottom:50 }} >
          <Container >
            <Navbar.Brand href="#home">TICKETS APP</Navbar.Brand>

            <Nav className="me-auto">

              <NavDropdown
                id="nav-dropdown-dark-example"
                title="Filter By status"
              >
                <NavDropdown.Item as="button" onClick={() => handleOnClick(0)} key={0}>
                  All
                </NavDropdown.Item>

                <NavDropdown.Item as="button" onClick={() => handleOnClick(1)} key={1}>
                  Created
                </NavDropdown.Item>

                <NavDropdown.Item as="button" onClick={() => handleOnClick(2)} key={2}>
                  Assigned
                </NavDropdown.Item>

                <NavDropdown.Item as="button" onClick={() => handleOnClick(3)} key={3}>
                  Closed
                </NavDropdown.Item>
              </NavDropdown>

              {(user.groups.includes(1)) ?
                <NavDropdown
                  id="nav-dropdown-dark-example"
                  title={"Notification"+("("+getNonReadNotification()+")")}
                >
                  <div className="notifications-root-container">
                    {userNotifications.map((notification) => (
                      <>
                        <div className={"notifications-container " + (notification.read ? 'white-notif' : 'grey-notif')}
                          key={notification.id}
                          onClick={() => handleShowNotifications(notification.by_ticket.id, notification.id)}>
                          {/* <NavDropdown.Item as="button" > */}
                          <div className="dropdown-content">
                            <div className="notification-container">
                              <div className="status-title-container">
                                {(notification.ticket_status === 2) ? <div className="status-assigned"></div> : null}
                                {(notification.ticket_status === 3) ? <div className="status-closed"></div> : null}
                                <div className="ticket-title">{notification.by_ticket.title}</div>
                              </div>
                              {(notification.ticket_status === 2) ?
                                <div className="ticket-description">Your ticket is being treated.</div>
                                : null}
                              {(notification.ticket_status === 3) ?
                                <div className="ticket-description">Your ticket is closed.</div>
                                : null}
                              <div className="ticket-date">{formatDate1(notification.time)}</div>
                            </div>
                          </div>
                        </div>
                        <hr className="notification-separator"></hr>
                      </>
                    ))}
                  </div>
                </NavDropdown>
                : null}

              <Nav.Link onClick={() => handleGetMyTickets()}>My Tickets</Nav.Link>

              {(user.groups.includes(1)) ?
                <Nav.Link onClick={() => goToAddTicketForm()}>Add Form</Nav.Link>
                : null}
            </Nav>
            <Nav className="d-flex">
              <Dropdown>
                <Dropdown.Toggle variant="primary" id="dropdown-basic" >
                  {user.username}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item /* href="/#/" */ onClick={() => handleLogout()} >Logout</Dropdown.Item>
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