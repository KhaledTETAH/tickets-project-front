import { combineReducers } from "redux";
import { ticketsReducer, selectedTicketReducer } from "./ticketReducer"; 

const reducers = combineReducers({
    ticketsReducer: ticketsReducer,
    selectedTicketReducer: selectedTicketReducer, 
});

export default reducers;