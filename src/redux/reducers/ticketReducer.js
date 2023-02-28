import { ticketActionTypes } from "../constants/ticketAction-types";

const ticketInitialState = {
    tickets: [],
    filteredTickets: [],
    filtering: false
};

export const ticketsReducer = (state = ticketInitialState, { type, payload }) => {
    switch (type) {
        case ticketActionTypes.SET_TICKETS:
            return { ...state, tickets: payload };

        case ticketActionTypes.ADD_TICKET:

            return {
                ...state,
                tickets: [ payload, ...state.tickets]
            };

        case ticketActionTypes.FILTERING_TICKETS:
            return {
                ...state,
                filtering: payload
            };

        case ticketActionTypes.FILTER_TICKETS_BY_STATUS:
            const status = payload;
            const filteredTickets = state.tickets.filter(
                (ticket) => ticket.status === status
            );
            return { ...state, filteredTickets };

        case ticketActionTypes.ASSIGN_TICKET:
            const updatedTicket = payload;
            const updatedTickets = state.tickets.map((ticket) =>
                ticket.id === updatedTicket.id ? updatedTicket : ticket
            );
            return {
                ...state,
                tickets: updatedTickets,
            };

        case ticketActionTypes.CLOSE_TICKET:
            const closedTicket = payload;
            const updatedClosedTickets = state.tickets.map((ticket) => 
                ticket.id === closedTicket.id ? closedTicket : ticket
            );
            return {
                ...state,
                tickets: updatedClosedTickets
            };
            
        default:
            return state;
    }
};

/* export const filterTicketsByStatusReducer = (state = ticketInitialState, {type, payload}) => {
    switch (type) {
        case ticketActionTypes.FILTER_TICKETS_BY_STATUS:
          const status = payload;
          const filteredTickets = state.tickets.filter(
            (ticket) => ticket.status === status
          );
          return { ...state, filteredTickets };
        default:
          return state;
      }
}; */

export const selectedTicketReducer = (state = {}, { type, payload }) => {
    switch (type) {
        case ticketActionTypes.SELECTED_TICKET:
            return { ...state, ...payload };
        case ticketActionTypes.REMOVE_SELECTED_TICKET:
            return {};
        default:
            return state;
    }
};
