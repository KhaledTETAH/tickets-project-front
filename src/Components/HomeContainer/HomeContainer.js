import React from "react";
import TicketList from "../TicketList/TicketList";
import TicketDetails from "../TicketDetails/TicketDetails";
import AddTicket from "../AddTicket/AddTicket";
import './HomeContainer.css';
import { useSelector } from "react-redux";
import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { removeSelectedTicket, assignTicket } from "../../redux/actions/ticketActions";
import Header from "../Header/Header";
import { useState } from "react";
import axios from "axios";

const PATCH_TICKET_URL = `http://localhost:8000/tickets_app/v1/tickets/`;

const HomeContainer = () => {

    const selectedTicket = useSelector((state) => state.selectedTicketReducer);
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
    const ticketsState = useSelector((state) => state.ticketsReducer);

    const dispatch = useDispatch();

/*     const goToAddTicketForm = () => {
        console.log('hhhhhh');
        dispatch(removeSelectedTicket());
    } */


   /*  const handleTreatment = () => {
        console.log("selectedTicket.id: ", selectedTicket.id);
        fetchAssignReaquest(selectedTicket.id);
    } */

/*     const fetchAssignReaquest = async (id) => {
        const payload = {
            status: 2,
            assigned_to: user.id,
            assigned_on: new Date()
        }
        const response = await axios.patch(PATCH_TICKET_URL+id+"/", payload)
        .catch((error) => {console.log(error)})
        const updatedTicket = {...ticketsState.tickets.find((ticket) => ticket.id === id)};
        updatedTicket.status = payload.status;
        updatedTicket.assigned_to = payload.assigned_to;
        updatedTicket.assigned_on = payload.assigned_on;
        dispatch(assignTicket(updatedTicket));
    } */

    const handleClose = () => {

    }


    return (
        <>
            <Header />
            <div className="home-container">
                <div className="left-container">
                    <TicketList />
                </div>
                <div className="right-container">
                    {(Object.keys(selectedTicket).length === 0) ? <AddTicket /> : <TicketDetails />}
                    {/* {(Object.keys(selectedTicket).length === 0) ? null :
                        <>
                            <Button className="add-ticket-nav-button" type="button" onClick={() => goToAddTicketForm()}>
                                Add Ticket
                            </Button>

                            {(selectedTicket.status === 1) ? 
                                <Button variant="warning" type="button" onClick={() => handleTreatment()}>
                                    Treat Ticket
                                </Button> :
                                null
                            }

                            {(selectedTicket.status === 2) ? 
                                <Button variant="success" type="button" onClick={() => handleClose()}>
                                    Close Ticket
                                </Button> :
                                null
                            }   
                            

                        </>
                    } */}
                </div>
            </div>
        </>

    )
};

export default HomeContainer;