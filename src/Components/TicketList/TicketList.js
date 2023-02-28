import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { selectedTicket, setTickets } from "../../redux/actions/ticketActions";
import Ticket from "../Ticket/Ticket";
import './TicketList.css';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

const URL = `http://localhost:8000/tickets_app/v1/tickets/`;

const TicketList = (props) => {
    const tickets = useSelector((state) => state.ticketsReducer.tickets);
    const filteredTickets = useSelector((state) => state.ticketsReducer.filteredTickets);
    const filteringTicketsBool = useSelector((state) => state.ticketsReducer.filtering);

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
        const response = await axios.get(URL + id)
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
    });

    const renderFilteredTickets = filteredTickets.map((ticket) => {
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
        <>
            {/* {renderFilteredTickets} */}
            {filteringTicketsBool ? renderFilteredTickets : renderTicketsList}
        </>
    )
}

export default TicketList;