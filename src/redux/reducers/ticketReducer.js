import { ticketActionTypes } from "../constants/ticketAction-types";

const ticketInitialState = {
    tickets: []
};

export const ticketsReducer = (state = ticketInitialState, {type, payload}) => {
    switch (type) {
        case ticketActionTypes.SET_TICKETS:
            return {...state, tickets: payload};
        default:
            return state;
    }
};

export const selectedProductReducer = (state = {}, {type, payload}) => {
    switch (type) {
        case ticketActionTypes.SELECTED_TICKET:
            return {...state, ...payload} 
        default:
            return state;
    }
}