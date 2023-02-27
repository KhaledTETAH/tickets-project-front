import { ticketActionTypes } from "../constants/ticketAction-types";

export const setTickets = (tickets) => {
    return {
        type: ticketActionTypes.SET_TICKETS,
        payload: tickets
    };
};

export const selectedTicket = (ticket) => {
    return {
        type: ticketActionTypes.SELECTED_TICKET,
        payload: ticket,
    }
};

export const filterTicketsByStatus = (status) => {
    return {
        type: ticketActionTypes.FILTER_TICKETS_BY_STATUS,
        payload: status,
    }
};

export const removeSelectedTicket = () => {
    return {
        type: ticketActionTypes.REMOVE_SELECTED_TICKET
    }
};

export const addTicket = (ticket) => {
    return {
        type: ticketActionTypes.ADD_TICKET,
        payload: ticket,
    }
};