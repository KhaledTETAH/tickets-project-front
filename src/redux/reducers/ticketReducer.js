import { ticketActionTypes } from "../constants/ticketAction-types";

const ticketInitialState = {
    tickets: [],
    filteredTickets: []
};

export const ticketsReducer = (state = ticketInitialState, {type, payload}) => {
    switch (type) {
        case ticketActionTypes.SET_TICKETS:
            return {...state, tickets: payload};
        case ticketActionTypes.ADD_TICKET:
            return {
                ...state,
                tickets:[...state.tickets, payload]
            };
        case ticketActionTypes.FILTER_TICKETS_BY_STATUS:
            const status = payload;
          const filteredTickets = state.tickets.filter(
            (ticket) => ticket.status === status
          );
          return { ...state, filteredTickets };
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

export const selectedTicketReducer = (state = {}, {type, payload}) => {
    switch (type) {
        case ticketActionTypes.SELECTED_TICKET:
            return {...state, ...payload};
        case ticketActionTypes.REMOVE_SELECTED_TICKET:
            return {};
        default:
            return state;
    }
};
