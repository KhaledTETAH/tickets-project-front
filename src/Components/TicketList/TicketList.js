import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { setTickets } from "../../redux/actions/ticketActions";
import Ticket from "../Ticket/Ticket";
import './TicketList.css';
import TicketDetails from "../TicketDetails/TicketDetails";

const URL = `http://localhost:8000/tickets_app/v1/tickets/`;

const TicketList = () => {
    const tickets = useSelector((state) => state.ticketsReducer.tickets);

    const dispatch = useDispatch();

    const fetchTicket = async () => {
        const response = await axios.get(URL)
        .catch((error) => {
            console.log(error)
        });
        dispatch(setTickets(response.data));
    };

    useEffect(() => {
        fetchTicket()
    }, []);

    console.log('tickets:', tickets);

    const renderTicketsList = tickets.map((ticket) => {
        return (
            <div className="ticket-div" key={ticket.id} onClick={() => {return ticket.id}}>
                <Ticket title={ticket.title}
                        description={ticket.description}
                        deadline={ticket.deadline}
                        status={ticket.status.name}
                />
            </div>
        )
    })

    return (
        <>{renderTicketsList}</>
    )
}

export default TicketList;