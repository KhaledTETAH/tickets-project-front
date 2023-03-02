import { useSelector } from "react-redux";
import { ticketActionTypes } from "../constants/ticketAction-types";
import { selectedTicket } from "../actions/ticketActions";


const ticketInitialState = {
    tickets: [],
    filteredTickets: [],
    filtering: false,
};

const notificationInitialState = {
    notifications: [],
}

const selectedTicketState = {
    selectedTicket: {}
}

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

export const notificationReducer = (state = notificationInitialState, {type, payload}) => {
    switch (type) {
        case ticketActionTypes.GET_USER_NOTIFICATIONS:
            return {...state, notifications: payload};

        case ticketActionTypes.ADD_NOTIFICATION:
            return {
                ...state,
                tickets: [ payload, ...state.notifications]
            };
        
        case ticketActionTypes.READ_NOTIFICATION:
            const notifs = state.notifications.map((notif) => {
                if(notif.id === payload) {
                    const readNotification = {...notif}
                    readNotification.read = true;
                    return  readNotification;
                }else{
                    return notif;
                };
            });
            return {
                ...state,
                notifications: notifs
            }; 

        default:
            return state;
    }
}

export const selectedTicketReducer = (state = selectedTicketState, { type, payload }) => {
    switch (type) {
        case ticketActionTypes.SELECTED_TICKET:
            return { ...state, 
                selectedTicket: payload        
            };

        case ticketActionTypes.REMOVE_SELECTED_TICKET:
            return {
                ...state,
                selectedTicket: {}
            };

        default:
            return state;
    }
};
