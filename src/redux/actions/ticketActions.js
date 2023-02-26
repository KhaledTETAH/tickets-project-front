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
}