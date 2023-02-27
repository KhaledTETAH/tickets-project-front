import { ticketActionTypes } from "../constants/ticketAction-types";

const ticketInitialState = {
    tickets: []
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
        default:
            return state;
    }
};

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
