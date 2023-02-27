import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { selectedTicket, setTickets } from "../../redux/actions/ticketActions";
import Ticket from "../Ticket/Ticket";
import './TicketList.css';
import { propTypes } from "react-bootstrap/esm/Image";
import { Request } from "react-axios";

const URL = `http://localhost:8000/tickets_app/v1/tickets/`;

const TicketList = (props) => {
    const tickets = useSelector((state) => state.ticketsReducer.tickets);

    const hundleClick = (key) => {
        props.onTicketClick(key);
    }

    const dispatch = useDispatch();

    const fetchTicket = async () => {
        const response = await axios.get(URL)
        .catch((error) => {
            console.log(error)
        });
        dispatch(setTickets(response.data));
    };

    const handleClick = async (id) => {
        const response = await axios.get(URL+id)
        .catch((error) => {
            console.log(error)
        });
        dispatch(selectedTicket(response.data));
    }

    useEffect(() => {
        fetchTicket()
    }, []);

    console.log('tickets:', tickets);

    const renderTicketsList = tickets.map((ticket) => {
        return (
            <div className="ticket-div" key={ticket.id} onClick={() => handleClick(ticket.id)}>
                <Ticket title={ticket.title}
                        description={ticket.description}
                        deadline={ticket.deadline}
                        status={ticket.status}
                />
            </div>
        )
    })

    return (
        <>{renderTicketsList}</>
    )
}

export default TicketList;