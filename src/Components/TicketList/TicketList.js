import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { selectTicket, setTickets, getUserNotifications } from "../../redux/actions/ticketActions";
import Ticket from "../Ticket/Ticket";
import './TicketList.css';
import { formatDate } from "../Utils/FormatDate";

const URL = `http://localhost:8000/tickets_app/v1/tickets/`;
const NOTIFICATIONS_URL = `http://localhost:8000/tickets_app/v1/notifications/ticket/details/`;

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
        dispatch(selectTicket(response.data));
    }

    useEffect(() => {
        fetchTicket();
    }, []);

    console.log('tickets:', tickets);

    let renderTicketsList = tickets.map((ticket) => {
        return (
            <div className="ticket-div" key={ticket.id} onClick={() => handleClick(ticket.id)}>
                <Ticket title={ticket.title}
                    description={ticket.description}
                    deadline={formatDate(ticket.deadline)}
                    status={ticket.status}
                />
            </div>
        )
    });

    let renderFilteredTickets = filteredTickets.map((ticket) => {
        return (
            <div className="ticket-div" key={ticket.id} onClick={() => handleClick(ticket.id)}>
                <Ticket title={ticket.title}
                    description={ticket.description}
                    deadline={formatDate(ticket.deadline)}
                    status={ticket.status}
                />
            </div>
        )
    });

    if (filteredTickets.length === 0) {
        renderFilteredTickets = (
            <div>
                <h3 className="no-tickets">No Tickets</h3>
            </div>
        );
    };

    if (renderTicketsList.length === 0) {
        renderTicketsList = (
            <div>
                <h3 className="no-tickets">No Tickets</h3>
            </div>
        );
    };

    return (
        <>
            {/* {renderFilteredTickets} */}
            {filteringTicketsBool ? renderFilteredTickets : renderTicketsList}
        </>
    )
}

export default TicketList;