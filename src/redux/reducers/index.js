import { combineReducers } from "redux";
import { ticketsReducer, selectedTicketReducer, notificationReducer } from "./ticketReducer"; 

const reducers = combineReducers({
    ticketsReducer: ticketsReducer,
    selectedTicketReducer: selectedTicketReducer, 
    notificationReducer: notificationReducer
});

export default reducers;